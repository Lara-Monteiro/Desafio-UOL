class PesquisarProduto{

    elements = {
        campoPesquisar: () => cy.get("#search_query_top"),
        botãoPesquisar: () => cy.get("button[name='submit_search']"),
        visualizarProduto: () => cy.get(".lighter")
    }

    typeProduto(produto){
        this.elements.campoPesquisar().type(produto);
    }

    clickPesquisar(){
        this.elements.botãoPesquisar().click();
    }
}

module.exports = new PesquisarProduto();