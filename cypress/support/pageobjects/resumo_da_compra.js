class PedidoRealizado{

    elements = {
        cabeçalho: () => cy.get("h1[class='page-heading']")
    }
}

module.exports = new PedidoRealizado();