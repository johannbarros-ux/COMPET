// COMPET — funcionalidades da página de adoção

const CHAVE_ANIMAIS = "compet_animais";
const CHAVE_FAVORITOS = "compet_favoritos";

// Animais demonstrativos para que a página não comece vazia.
const animaisExemplo = [
    {
        id: "exemplo-1",
        nome: "Nina",
        especie: "cachorro",
        sexo: "femea",
        idade: "1 ano",
        porte: "pequeno",
        castrado: "sim",
        vacinado: "em-dia",
        temperamento: "calmo",
        descricao: "Nina é tranquila e gosta de companhia. Estas informações são demonstrativas.",
        responsavel: "Equipe COMPET (exemplo)",
        contato: "Contato ilustrativo",
        cidade: "Campina Grande",
        estado: "PB"
    },
    {
        id: "exemplo-2",
        nome: "Tom",
        especie: "gato",
        sexo: "macho",
        idade: "8 meses",
        porte: "pequeno",
        castrado: "nao-sei",
        vacinado: "incompleta",
        temperamento: "brincalhao",
        descricao: "Tom é curioso e brincalhão. Estas informações são demonstrativas.",
        responsavel: "Equipe COMPET (exemplo)",
        contato: "Contato ilustrativo",
        cidade: "Campina Grande",
        estado: "PB"
    },
    {
        id: "exemplo-3",
        nome: "Bento",
        especie: "cachorro",
        sexo: "macho",
        idade: "3 anos",
        porte: "grande",
        castrado: "nao",
        vacinado: "em-dia",
        temperamento: "sociavel",
        descricao: "Bento é sociável e precisa de espaço para brincar. Estas informações são demonstrativas.",
        responsavel: "Equipe COMPET (exemplo)",
        contato: "Contato ilustrativo",
        cidade: "Lagoa Seca",
        estado: "PB"
    },
    {
        id: "exemplo-4",
        nome: "Amora",
        especie: "gato",
        sexo: "femea",
        idade: "2 anos",
        porte: "pequeno",
        castrado: "sim",
        vacinado: "em-dia",
        temperamento: "timido",
        descricao: "Amora é um pouco tímida e precisa de adaptação tranquila. Estas informações são demonstrativas.",
        responsavel: "Equipe COMPET (exemplo)",
        contato: "Contato ilustrativo",
        cidade: "Campina Grande",
        estado: "PB"
    }
];

function carregarLista(chave) {
    try {
        const dados = localStorage.getItem(chave);
        return dados ? JSON.parse(dados) : [];
    } catch (erro) {
        return [];
    }
}

function salvarLista(chave, lista) {
    try {
        localStorage.setItem(chave, JSON.stringify(lista));
        return true;
    } catch (erro) {
        return false;
    }
}

function obterAnimais() {
    let animais = carregarLista(CHAVE_ANIMAIS);

    if (animais.length === 0) {
        animais = animaisExemplo;
        salvarLista(CHAVE_ANIMAIS, animais);
    }

    return animais;
}

function criarTexto(tag, classe, conteudo) {
    const elemento = document.createElement(tag);
    elemento.className = classe;
    elemento.textContent = conteudo;
    return elemento;
}

function nomeEspecie(valor) {
    if (valor === "cachorro") return "Cachorro";
    if (valor === "gato") return "Gato";
    return "Outro";
}

function nomeSexo(valor) {
    if (valor === "macho") return "Macho";
    if (valor === "femea") return "Fêmea";
    return "Não informado";
}

function nomePorte(valor) {
    if (valor === "pequeno") return "Pequeno";
    if (valor === "medio") return "Médio";
    if (valor === "grande") return "Grande";
    return "Não informado";
}

function criarCard(animal, favoritos) {
    const card = document.createElement("article");
    card.className = "animal-card";

    const topo = document.createElement("div");
    topo.className = "animal-card-topo";

    const especie = criarTexto("span", "animal-etiqueta", nomeEspecie(animal.especie));
    const botaoFavorito = document.createElement("button");
    botaoFavorito.type = "button";
    botaoFavorito.className = "animal-favorito";
    botaoFavorito.textContent = favoritos.includes(animal.id) ? "♥ Favorito" : "♡ Favoritar";
    botaoFavorito.setAttribute("aria-pressed", favoritos.includes(animal.id) ? "true" : "false");
    botaoFavorito.setAttribute("aria-label", (favoritos.includes(animal.id) ? "Remover " : "Adicionar ") + animal.nome + (favoritos.includes(animal.id) ? " dos favoritos" : " aos favoritos"));

    botaoFavorito.addEventListener("click", function () {
        let listaFavoritos = carregarLista(CHAVE_FAVORITOS);

        if (listaFavoritos.includes(animal.id)) {
            listaFavoritos = listaFavoritos.filter(function (id) {
                return id !== animal.id;
            });
        } else {
            listaFavoritos.push(animal.id);
        }

        if (salvarLista(CHAVE_FAVORITOS, listaFavoritos)) {
            mostrarAnimais();
        }
    });

    topo.append(especie, botaoFavorito);

    const titulo = criarTexto("h3", "animal-nome", animal.nome);
    const resumo = criarTexto("p", "animal-resumo", animal.descricao);
    const detalhes = document.createElement("ul");
    detalhes.className = "animal-detalhes";

    const informacoes = [
        "Idade: " + animal.idade,
        "Sexo: " + nomeSexo(animal.sexo),
        "Porte: " + nomePorte(animal.porte),
        "Local: " + animal.cidade + " - " + animal.estado,
        "Castração: " + animal.castrado,
        "Vacinação: " + animal.vacinado
    ];

    informacoes.forEach(function (informacao) {
        detalhes.appendChild(criarTexto("li", "", informacao));
    });

    const responsavel = criarTexto("p", "animal-responsavel", "Responsável: " + animal.responsavel);
    const contato = criarTexto("p", "animal-contato", "Contato: " + animal.contato);

    card.append(topo, titulo, resumo, detalhes, responsavel, contato);
    return card;
}

function mostrarAnimais() {
    const lista = document.getElementById("listaAnimais");
    const mensagem = document.getElementById("mensagemLista");
    const quantidade = document.getElementById("quantidadeAnimais");

    if (!lista || !mensagem || !quantidade) return;

    const animais = obterAnimais();
    const favoritos = carregarLista(CHAVE_FAVORITOS);
    const busca = document.getElementById("buscaAnimal").value.trim().toLowerCase();
    const especie = document.getElementById("filtroEspecie").value;
    const porte = document.getElementById("filtroPorte").value;
    const sexo = document.getElementById("filtroSexo").value;
    const apenasFavoritos = document.getElementById("somenteFavoritos").checked;

    const filtrados = animais.filter(function (animal) {
        const combinaNome = animal.nome.toLowerCase().includes(busca);
        const combinaEspecie = especie === "" || animal.especie === especie;
        const combinaPorte = porte === "" || animal.porte === porte;
        const combinaSexo = sexo === "" || animal.sexo === sexo;
        const combinaFavorito = !apenasFavoritos || favoritos.includes(animal.id);

        return combinaNome && combinaEspecie && combinaPorte && combinaSexo && combinaFavorito;
    });

    lista.replaceChildren();
    quantidade.textContent = filtrados.length + (filtrados.length === 1 ? " animal encontrado" : " animais encontrados");

    if (filtrados.length === 0) {
        mensagem.textContent = "Nenhum animal corresponde aos filtros. Tente alterar a busca.";
        return;
    }

    mensagem.textContent = "";

    filtrados.forEach(function (animal) {
        lista.appendChild(criarCard(animal, favoritos));
    });
}

const campoBusca = document.getElementById("buscaAnimal");

if (campoBusca) {
    document.getElementById("buscaAnimal").addEventListener("input", mostrarAnimais);
    document.getElementById("filtroEspecie").addEventListener("change", mostrarAnimais);
    document.getElementById("filtroPorte").addEventListener("change", mostrarAnimais);
    document.getElementById("filtroSexo").addEventListener("change", mostrarAnimais);
    document.getElementById("somenteFavoritos").addEventListener("change", mostrarAnimais);
    document.getElementById("limparFiltros").addEventListener("click", function () {
        document.getElementById("buscaAnimal").value = "";
        document.getElementById("filtroEspecie").value = "";
        document.getElementById("filtroPorte").value = "";
        document.getElementById("filtroSexo").value = "";
        document.getElementById("somenteFavoritos").checked = false;
        mostrarAnimais();
    });

    mostrarAnimais();
}
