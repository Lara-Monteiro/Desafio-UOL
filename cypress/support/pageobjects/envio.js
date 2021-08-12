class Envio{

    elements = {
        cabeçalho: () => cy.get("h1[class='page-heading']"),
        checkbox: () => cy.get("#cgv"),
        botãoProsseguir: () => cy.get("button[name='processCarrier']")
    }

    TermsOfService(){
        this.elements.checkbox().check();    
    }

    prosseguirCompra(){
        this.elements.botãoProsseguir().click();       
    }
}

module.exports = new Envio();