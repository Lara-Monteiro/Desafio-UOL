Esse projeto tem como objetivo simular uma compra no e-commerce http://automationpractice.com/index.php, utilizando Cypress e Cucumber.

Segue fluxograma das funcionalidades do e-commerce:

![untitled@2x](https://user-images.githubusercontent.com/88739797/129218725-308b68fd-dfa1-40b5-9593-881e9707690a.png)

---
***INSTRUÇÕES***

***Instalando e configurando o Cypress:***

Pré-condições: 
Node.js instalado;
IDE de Java Script (utilizei VS Code).


Primeiramente, é necessário possuir uma pasta aonde será criado o projeto. Para usuários Windows, é recomendado colocar a pasta no C:.

Dentro dessa pasta, podemos iniciar o git, através do comando **git init**.

Após essa configuração, deve-se rodar o comando **npm init** para que seja criado automaticamente a pasta package.json.

E enfim, instalar o cypress, através do comando: **npm Install cypress —dev**

Após essa instalação, deve-se abrir o editor ou IDE (no meu caso utilizei VS Code), e rodar o comando **npx cypress open**. Esse comando irá iniciar o Cypress e criar automaticamente a estrutura necessária para se criar o projeto. Além disso, traz exemplos que o usuário pode utilizar (os exemplos podem ser excluídos sem problemas).

***Para integrar o cypress com o cucumber:***

Para instalar o plugin, basta rodar o seguinte comando dentro da pasta do projeto:

**npm install —save-dev cypress-cucumber-preprocessor**

Após isso, é necessário fazer as seguintes configurações:

No caminho cypress/plugins/index.js, deve-se colocar o seguinte:

> const cucumber = require('cypress-cucumber-preprocessor').default
> 
> module.exports = (on, config) => {
>   on('file:preprocessor', cucumber())
> }
> 

E no arquivo cypress.json, deve-se adicionar:

> 
> {
>   "testFiles": "**/*.feature"
> }
>  
> E por fim, adicionar à pasta package.json:
> 
> "cypress-cucumber-preprocessor": {
>  "nonGlobalStepDefinitions": true
> }
 
Para mais detalhes do plugin cypress-cucumber-preprocessor, as informações estão aqui: https://github.com/TheBrainFamily/cypress-cucumber-preprocessor

Após as configurações acima, já podemos começar a escrever o nosso teste.

Dentro da pasta integration, deve-se criar um arquivo .feature; no caso, utilizei automationPractice.feature; 
E nessa pasta, deve-se escrever os passos, utilizando a sintaxe Gherkin (Given, When, And e Then), que traduz-se como “Dado”, “Quando”, “E” e “Então”. No caso, meu cenário ficou assim:

> Feature: Simular uma compra
> 
>  Scenario: realizar compra com sucesso
>  Given que o usuário acessa o servidor
>  When pesquisar o produto
>  And adicionar ao carrinho
>  And efetuar login
>  And escolher o endereço de entrega
>  And escolher a forma de envio
>  And realizar o pagamento
>  Then o sistema deve emitir mensagem de sucesso

O usuário pode implementar quantos cenários desejar, criando fluxos alternativos.

Depois dos passos definidos, deve-se criar uma pasta dentro de Integration com o mesmo nome do arquivo .feature.

Por exemplo, se meu arquivo foi automationPractice.feature, a pasta deve-se chamar automationPractice.

Dentro dessa pasta, estará os steps do teste. 

No caso de haver passos em comum de uma mesma feature, deve-se criar uma pasta chamada common, e colocar esses passos nela (no meu caso, não se aplica).

Dentro do arquivo dos steps, será implementado o teste automatizado. Pode-se escrever manualmente, mas também há uma extensão do VS Code para facilitar o processo, chamada Cuke. Ela gera a estrutura dos steps.

***Page Objects:***

Afim de organizar o meu teste, dividi em page objects. Para isso, criei classes para cada step do meu cenário, e o importei no arquivo dos steps.

Na pasta support, deve-se criar uma pasta aonde ficará os page objects. No meu caso, a nomeei de pageobjects.

Nela, define-se os elementos da página com os quais o teste irá interagir, e as ações que irá tomar.

Passo 1 - Given que o usuário acessa o servidor:

Para implementarmos esse passo, iremos até a pasta cypress.json e definirmos nossa baseUrl que usaremos no projeto.

Dessa forma, acrescentamos na pasta: 

> "baseUrl": "http://automationpractice.com/index.php"

Assim, de volta ao arquivo steps.js, colocamos o seguinte:

> cy.visit(‘/‘)


Passo 2 - When pesquisar o produto

Aqui já começamos a utilizar o page objects. Para isso deve-se criar o arquivo .js, dentro da pasta pageobjects previamente criada. No caso, nomeei o arquivo de pesquisar_produto.js

Primeiramente, criamos uma classe, da seguinte forma:

> class PesquisarProduto{
> 
>
 Em seguida, definimos os elementos que iremos interagir na página:
>
>    elements = {
>        campoPesquisar: () => cy.get("#search_query_top"),
>        botãoPesquisar: () => cy.get("button[name='submit_search']"),
>        visualizarProduto: () => cy.get(".lighter")
>    }

E depois, definimos as ações que teremos com cada elemento:


>    typeProduto(produto){
>        this.elements.campoPesquisar().type(produto);
>    }
>
>    clickPesquisar(){
>        this.elements.botãoPesquisar().click();
>    }
> }

 Por fim, exportamos a classe, afim de que possamos chama-la em outros arquivos:

> module.exports = new PesquisarProduto();


De volta ao arquivo dos steps, devemos primeiramente importar o nosso page objects. Para isso, utilizamos: 

> import PesquisarProduto from '../../support/pageobjects/pesquisar_produto'

Depois disso, dentro do step, devemos “chamar" nossa classe e os elementos:

> When(/^pesquisar o produto$/, () => {
>    PesquisarProduto.typeProduto("Faded Short Sleeve");
>    PesquisarProduto.clickPesquisar();
>    PesquisarProduto.elements.visualizarProduto().should("contain", "Faded Short Sleeve")
> });

É importante sempre haver validações da tela em questão, por exemplo, mensagens de erro, mensagens de sucesso, cabeçalhos, e afins, para assegurar que o teste está validando com sucesso.

Assim como no passo anterior, todos os próximos utilizarão page objects, então o passo a passo é bem semelhante.       

Gerando reports:

No terminal, dentro da pasta, rodar o comando: **npm i --save-dev cypress-mochawesome-reporter**

No pasta cypress.json, acrescentar:
> "reporter": "cypress-mochawesome-reporter",
>  "reporterOptions": {
>    "reportDir": "cypress/reports",
>    "charts": true,
>    "reportPageTitle": "My Test Suite",
>    "embeddedScreenshots": true,
>    "inlineAssets": true
>  },
>  "video": false

Abrir o arquivo index.js dentro da pasta plugin, e acrescentar:

> module.exports = (on, config) => {
>  require('cypress-mochawesome-reporter/plugin')(on);
> };

Abrir o arquivo index.js dentro da pasta support, e acrescentar:

> import 'cypress-mochawesome-reporter/register';

Por fim, rodar o comando **npx cypress run** no terminal, para .

Após rodar o teste, o relatório se encontrará no caminho: cypress/reports
