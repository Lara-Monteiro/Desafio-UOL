class Endereço{

    elements = {
        cabeçalho: () => cy.get("h3[class='page-subheading'"),
        botãoProsseguir: () => cy.get("button[name='processAddress']")
    }

    prosseguirCompra(){
        this.elements.botãoProsseguir().click();     
    }
}

module.exports = new Endereço();