// Validação dos formulários COMPET.
// Os dados ainda não são enviados para um servidor.

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
        const mensagem = document.getElementById("mensagemCadastro");

        mensagem.className = "mensagem-formulario";
        mensagem.textContent = "";
        confirmarSenha.removeAttribute("aria-invalid");

        if (senha.value !== confirmarSenha.value) {
            mensagem.classList.add("mensagem-erro");
            mensagem.textContent = "As senhas não são iguais. Confira os dois campos.";
            confirmarSenha.setAttribute("aria-invalid", "true");
            confirmarSenha.focus();
            return;
        }

        mensagem.classList.add("mensagem-sucesso");
        mensagem.textContent = "Os campos foram validados. O cadastro ainda não é enviado nem salvo porque falta a integração com o back-end.";
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
        mensagem.className = "mensagem-formulario mensagem-sucesso";
        mensagem.textContent = "Os campos foram validados. O cadastro ainda não é enviado nem salvo porque falta a integração com o back-end.";
    });
}
