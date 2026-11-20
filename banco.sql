DROP DATABASE IF exists banco;
CREATE DATABASE banco;
USE banco;

DROP TABLE IF EXISTS Gerente;
CREATE TABLE Gerente (
	idFuncionario INT PRIMARY KEY NOT NULL
);

DROP TABLE IF EXISTS Funcionario;
CREATE TABLE Funcionario (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    telefone VARCHAR(20),
    idGerente INT,
    horario CHAR(11) NOT NULL,
    
	CONSTRAINT fk_funcionario_gerente FOREIGN KEY (idGerente) REFERENCES Gerente(idFuncionario)
);

ALTER TABLE Gerente ADD CONSTRAINT fk_gerente_funcionario FOREIGN KEY (idFuncionario) REFERENCES Funcionario(id);

DROP TABLE IF EXISTS TI;
CREATE TABLE TI (
	id INT PRIMARY KEY,

	CONSTRAINT fk_ti_funcionario FOREIGN KEY (id) REFERENCES Funcionario(id)
);

DROP TABLE IF EXISTS Cuidados;
CREATE TABLE Cuidados (
	id INT PRIMARY KEY,
    
    CONSTRAINT fk_cuidados_funcionario FOREIGN KEY (id) REFERENCES Funcionario(id)
);

DROP TABLE IF EXISTS Adotante;
CREATE TABLE Adotante (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    telefone VARCHAR(20),
    cpf CHAR(11) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS Adocao;
CREATE TABLE Adocao (
	id INT AUTO_INCREMENT PRIMARY KEY,
    idTI INT NOT NULL,
    idAdotante INT NOT NULL,
    data_date DATE,
    hora TIME,
    
    CONSTRAINT fk_adocao_ti FOREIGN KEY (idTI) REFERENCES TI(id),
    CONSTRAINT fk_adocao_adotante FOREIGN KEY (idAdotante) REFERENCES Adotante(id)
);

DROP TABLE IF EXISTS Cadastro;
CREATE TABLE Cadastro (
	id INT AUTO_INCREMENT PRIMARY KEY,
    idTI INT NOT NULL,
    data_date DATE,
    local_char VARCHAR(100),
    
    CONSTRAINT fk_cadastro_ti FOREIGN KEY (idTI) REFERENCES TI(id)
);

DROP TABLE IF EXISTS Animal;
CREATE TABLE Animal (
	id INT AUTO_INCREMENT PRIMARY KEY,
    idCadastro INT NOT NULL,
    idAdocao INT,
    porte VARCHAR(7),
    idade INT,
    raca VARCHAR(50),
    
    CONSTRAINT fk_animal_cadastro FOREIGN KEY (idCadastro) REFERENCES Cadastro(id),
    CONSTRAINT fk_animal_adocao FOREIGN KEY (idAdocao) REFERENCES Adocao(id)
);

DROP TABLE IF EXISTS Cuida;
CREATE TABLE Cuida (
	idCuidados INT,
    idAnimal INT,
    PRIMARY KEY (idCuidados, idAnimal),
    
    CONSTRAINT fk_cuida_cuidados FOREIGN KEY (idCuidados) REFERENCES Cuidados(id),
    CONSTRAINT fk_cuida_animal FOREIGN KEY (idAnimal) REFERENCES Animal(id)
);

INSERT INTO Funcionario (nome, telefone, horario) VALUES ("Ester Barbosa", "83999998888", "13:00-21:00"),
("Pedro Ferreita Dantas", "21912347890", "21:00-05:00");

INSERT INTO Gerente VALUES 
(1),
(2);

INSERT INTO Funcionario (nome, telefone, idGerente, horario) VALUES 
("Ruan Sampaio Lima", "83987879090", 1, "00:00-08:00"), 
("Matheus Henrique", "26996524748", 2, "02:00-10:00"),
("Bruna Armanda", "26983831246", 2, "01:00-09:00");

INSERT INTO TI VALUES 
(3),
(5);
INSERT INTO Cuidados VALUES (4);

INSERT INTO Cadastro (idTI, data_date, local_char) VALUES 
(3, NULL, NULL),
(3, "2026-02-20", "Abrigo Central - Campina Grande");

INSERT INTO Adotante (nome, telefone, cpf) VALUES
("Sergio Moreira Barros", NULL, "98435227537"),
("Matilda Vieira", "12953623748", "52728168032");

INSERT INTO Animal (idCadastro, idAdocao, porte, idade, raca) VALUES 
(1, NULL, "Medio", NULL, "Spitz Alemao"),
(2, NULL, "Pequeno", 5, "Munchkin");

INSERT INTO Cuida VALUES 
(4, 1);

INSERT INTO Adocao (idTI, idAdotante, data_date, hora) VALUES 
(5, 2, "2026-05-24", "08:30:47");

UPDATE Animal SET idAdocao = 1 WHERE id = 2;