class Pagamento{

    elements = {
        cabeçalho: () => cy.get("h1[class='page-heading']"),
        escolherPagamento: () => cy.get("a[title='Pay by check.']"),
        confirmarPedido: () => cy.get("#cart_navigation > .button > span")
    }

    escolherPagamento(){
        this.elements.escolherPagamento().click();
    }

    confirmarPedido(){
        this.elements.confirmarPedido().click();
    }
}

module.exports = new Pagamento();