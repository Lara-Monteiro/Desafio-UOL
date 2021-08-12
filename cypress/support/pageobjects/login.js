class Login{

    elements = {
        cabeçalho: () => cy.get("h1[class='page-heading']"),
        campoEmail: () => cy.get("#email"),
        campoSenha: () => cy.get("#passwd"),
        submit: () => cy.get("#SubmitLogin")
    }

    digitarEmail(email){
        this.elements.campoEmail().type(email);
    }

    digitarSenha(senha){
        this.elements.campoSenha().type(senha);
    }

    clicarSignIn(){
        this.elements.submit().click();
    }
}

module.exports = new Login();