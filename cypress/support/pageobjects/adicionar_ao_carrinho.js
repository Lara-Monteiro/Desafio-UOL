class AdicionarAoCarrinho{

    elements = {
        botãoAdicionar: () => cy.get("a[title='Add to cart']"),
        botãoProsseguir: () => cy.get("a[title='Proceed to checkout']"),
        sumário: () => cy.get("#cart_title"),
        botãoProceedToCheckout: () => cy.get(".cart_navigation > .button > span")
    }

    adicionarProduto(){
        this.elements.botãoAdicionar().click();
    }

    prosseguirCompra(){
        this.elements.botãoProsseguir().click();
    }

    proceedToCheckout(){
        this.elements.botãoProceedToCheckout().click()
    }
}

module.exports = new AdicionarAoCarrinho();