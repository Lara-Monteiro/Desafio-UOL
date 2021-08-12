Feature: Simular uma compra

Scenario: Realizar compra com sucesso
    Given que o usuário acessa o servidor
    When pesquisar o produto
    And adicionar ao carrinho
    And efetuar login
    And escolher o endereço de entrega
    And escolher a forma de envio
    And realizar o pagamento
    Then o sistema deve emitir mensagem de sucesso
