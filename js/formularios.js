// Validação e interação dos formulários COMPET.
// O cadastro de animais fica salvo apenas neste navegador, até a integração com o back-end.

const formularioCadastro = document.getElementById("formCadastro");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formularioCadastro.checkValidity()) {
            formularioCadastro.reportValidity();
            return;
        }

        const senha = document.getElementById("senha");
        const confirmarSenha = document.getElementById("confirmar");
        const nascimento = document.getElementById("nascimento");
        const mensagem = document.getElementById("mensagemCadastro");

        mensagem.className = "mensagem-formulario";
        mensagem.textContent = "";
        confirmarSenha.removeAttribute("aria-invalid");

        const hoje = new Date();
        const ano = hoje.getFullYear();
        const mes = String(hoje.getMonth() + 1).padStart(2, "0");
        const dia = String(hoje.getDate()).padStart(2, "0");
        const dataLocal = ano + "-" + mes + "-" + dia;

        if (nascimento.value > dataLocal) {
            mensagem.classList.add("mensagem-erro");
            mensagem.textContent = "A data de nascimento não pode estar no futuro.";
            nascimento.setAttribute("aria-invalid", "true");
            nascimento.focus();
            return;
        }

        if (senha.value !== confirmarSenha.value) {
            mensagem.classList.add("mensagem-erro");
            mensagem.textContent = "As senhas não são iguais. Confira os dois campos.";
            confirmarSenha.setAttribute("aria-invalid", "true");
            confirmarSenha.focus();
            return;
        }

        nascimento.removeAttribute("aria-invalid");
        mensagem.classList.add("mensagem-sucesso");
        mensagem.textContent = "Os campos foram validados. O cadastro de usuário ainda não é enviado nem armazenado: essa etapa será feita com o back-end.";
    });

    formularioCadastro.addEventListener("reset", function () {
        const mensagem = document.getElementById("mensagemCadastro");
        mensagem.className = "mensagem-formulario";
        mensagem.textContent = "";
    });
}

const formularioAnimal = document.getElementById("formAnimal");

if (formularioAnimal) {
    formularioAnimal.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formularioAnimal.checkValidity()) {
            formularioAnimal.reportValidity();
            return;
        }

        const mensagem = document.getElementById("mensagemAnimal");
        const campos = new FormData(formularioAnimal);
        const animal = {
            id: "animal-" + Date.now(),
            nome: campos.get("nome_animal").trim(),
            especie: campos.get("especie"),
            sexo: campos.get("sexo"),
            idade: campos.get("idade").trim(),
            porte: campos.get("porte"),
            castrado: campos.get("castrado"),
            vacinado: campos.get("vacinado"),
            temperamento: campos.get("temperamento"),
            descricao: campos.get("descricao").trim(),
            responsavel: campos.get("responsavel").trim(),
            contato: campos.get("contato").trim(),
            cidade: campos.get("cidade").trim(),
            estado: campos.get("estado")
        };

        if (animal.nome === "" || animal.idade === "" || animal.descricao === "" ||
            animal.responsavel === "" || animal.contato === "" || animal.cidade === "") {
            mensagem.className = "mensagem-formulario mensagem-erro";
            mensagem.textContent = "Preencha os campos obrigatórios sem deixar apenas espaços.";
            return;
        }

        let animais = [];

        try {
            const dadosSalvos = localStorage.getItem("compet_animais");
            const listaSalva = dadosSalvos ? JSON.parse(dadosSalvos) : [];
            animais = Array.isArray(listaSalva) ? listaSalva : [];
        } catch (erro) {
            mensagem.className = "mensagem-formulario mensagem-erro";
            mensagem.textContent = "Não foi possível ler os cadastros salvos neste navegador.";
            return;
        }

        animais.push(animal);

        try {
            localStorage.setItem("compet_animais", JSON.stringify(animais));
            mensagem.className = "mensagem-formulario mensagem-sucesso";
            mensagem.textContent = "Animal cadastrado neste navegador! Ele já pode aparecer na página de adoção deste mesmo navegador. A foto não foi armazenada e os dados ainda não foram enviados a um servidor.";
            formularioAnimal.reset();
        } catch (erro) {
            mensagem.className = "mensagem-formulario mensagem-erro";
            mensagem.textContent = "Não foi possível salvar. O armazenamento do navegador pode estar cheio ou desativado.";
        }
    });

    formularioAnimal.addEventListener("reset", function () {
        const mensagem = document.getElementById("mensagemAnimal");
        mensagem.className = "mensagem-formulario";
        mensagem.textContent = "";
    });
}
