import PesquisarProduto from '../../support/pageobjects/pesquisar_produto'
import AdicionarAoCarrinho from '../../support/pageobjects/adicionar_ao_carrinho'
import Login from '../../support/pageobjects/login'
import Endereço from '../../support/pageobjects/endereço'
import Envio from '../../support/pageobjects/envio'
import Pagamento from '../../support/pageobjects/pagamento'
import PedidoRealizado from '../../support/pageobjects/resumo_da_compra'

Given(/^que o usuário acessa o servidor$/, () => {
	cy.visit('/')
});

When(/^pesquisar o produto$/, () => {
	PesquisarProduto.typeProduto("Faded Short Sleeve");
	PesquisarProduto.clickPesquisar();
	PesquisarProduto.elements.visualizarProduto().should("contain", "Faded Short Sleeve")
});

When(/^adicionar ao carrinho$/, () => {
	AdicionarAoCarrinho.adicionarProduto();
	AdicionarAoCarrinho.prosseguirCompra();
	AdicionarAoCarrinho.elements.sumário().should("contain", "Shopping-cart summary");
	AdicionarAoCarrinho.proceedToCheckout();
	{ multiple: true }
});


When(/^efetuar login$/, () => {
	Login.elements.cabeçalho().should("contain", "Authentication");
	Login.digitarEmail("suhan-moino@gmail.com");
	Login.digitarSenha("Teste1234");
	Login.clicarSignIn();
});


When(/^escolher o endereço de entrega$/, () => {
	Endereço.elements.cabeçalho().should("contain", "Your delivery address");
	Endereço.prosseguirCompra();
});


When(/^escolher a forma de envio$/, () => {
	Envio.elements.cabeçalho().should("contain", "Shipping");
	Envio.TermsOfService();
	Envio.prosseguirCompra();
});


When(/^realizar o pagamento$/, () => {
	Pagamento.elements.cabeçalho().should("contain", "Please choose your payment method");
	Pagamento.escolherPagamento();
	Pagamento.confirmarPedido();
});


Then(/^o sistema deve emitir mensagem de sucesso$/, () => {
	PedidoRealizado.elements.cabeçalho().should("contain", "Order confirmation");
});
