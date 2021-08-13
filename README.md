Esse projeto tem como objetivo apresentar instruçoes e configurações do cypress; 
A pasta nomeada de "cypress" é o teste de interface simulando uma compra no e-commerce http://automationpractice.com/index.php, utilizando Cypress e Cucumber.
A pasta nomeada de "cypress API" é o teste automatizado da API https://gorest.co.io/.


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

Após essa configuração, deve-se rodar o comando **npm init** para que seja criado automaticamente o arquivo package.json.

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
E nesse arquivo, deve-se escrever os passos, utilizando a sintaxe Gherkin (Given, When, And e Then), que traduz-se como “Dado”, “Quando”, “E” e “Então”. No caso, meu cenário ficou assim:

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

Por fim, rodar o comando **npx cypress run** no terminal.

Após rodar o teste, o relatório se encontrará no caminho: cypress/reports


# Teste de API

É necessário criar uma pasta dentro da pasta aonde foi instalado o cypress, que será o local do projeto; e abri-la no VS Code, após isso, rodar o comando **npx Cypress open** para abrir o cypress e gerar a estrutura padrão do cypress.

Após isso, já podemos começar a escrever nosso teste de API:

Dentro da pasta integration, deve-se criar uma pasta chamada GOREST.

E nessa pasta, criar mais três pastas: 

Addloads: aonde estarão as informações do usuário e o novo usuário que eu quero adicionar;

Requests: aonde estarão as requisições;

Tests: aonde estará o teste em si.

Após isso, definimos nossa urlBase: para isso, iremos até a pasta cypress.json e definirmos nossa baseUrl que usaremos no projeto.

Dessa forma, acrescentamos na pasta: 
"baseUrl": "https://gorest.co.in/"

Começamos com a criação do arquivo dentro da pasta requests, de nome “GETUser.request.js”. O arquivo ficará assim:

> function AllUsers() {
>    return cy.request({
>        method: 'GET',
>        url: '/users/',
>        failOnStatusCode: false
>    })
> }
>
> export{AllUsers}

Depois, adicionar arquivo "POSTuser.request.js". O arquivo ficará assim:

> const newuser = require('../Addloads/newuser.json')
> //const access_token = require('../Support/utilis')
> 
> function GetUsers() {
>    return cy.request({
>        method: 'POST',
>        url: '/users/',
>        // Caso queria adicionar mais um usuário, direcionar para a página Addloads > newuser.json
>        // Lembrando que: o ID e o email devem ser unicos, não podem já existir no banco de dados.
>        auth: {
>            bearer: 'c663ac9c6dd00e3344c3a9538c195a757df6be6a0ca4f80c54ffe179b8d59cdb'           
>        },
>        // Token da API. Ao testar, criar uma conta na aplicação e substituir pela KEY gerada pela sua conta.
>        
>        body: newuser
>    })
> }
> export {GetUsers}

E por fim, adicionar o arquivo "DELETEuser.request.js". O arquivo ficará assim:

> const infousers = require('../Addloads/infousers.json')
>
> function DELETEUsers(idUser) {
>    return cy.request({
>        method: 'DELETE',
>        //url: `users/${idUser}`,
>        url: '/users/2147/',
>        // ID 2147 foi o último ID que criei com dados que podem ser encontrados na pasta Addloads > newuser.json
>        // O teste de DELETE realizado com ele foi um sucesso.
>        auth: {
>            bearer: 'c663ac9c6dd00e3344c3a9538c195a757df6be6a0ca4f80c54ffe179b8d59cdb'
>
>        },
>        //body: infousers,
>        failOnStatusCode: false
>    
>    })
> } 
> export {DELETEUsers}

E após isso, dentro da pastas tests, criamos o arquivo: /GETUsers.spec.js, aonde importaremos o que foi criado no arquivo GETUser.request.js:
O arquivo ficará assim:

> import * as GETUser from '../requests/GETUser.request'
>
> describe('GET User', () => {
>        it('Requisitando usuários', () =>{
>            GETUser.AllUsers().should((response) => {
>                expect(response.body)
>                expect(response.status).to.eq(200)
>                expect(response.body).to.be.not.null
>
>
>            })
>        })
> })

Depois, dentro da pastas tests, criamos o arquivo: /POSTUsers.spec.js, aonde importaremos o que foi criado no arquivo POSTUser.request.js:
O arquivo ficará assim:

> import * as POSTUser from '../requests/POSTUser.request'
> 
> describe('POST User', () => {
>    it("Adicionando um User novo", () => {
>        POSTUser.GetUsers().should((response) => {
>            expect(response.status).to.eq(201)
>            //expect(response.body.id).to.eq(202);
>           
>        })
>    })
> })

Depois, dentro da pastas tests, criamos o arquivo: /DELETEUsers.spec.js, aonde importaremos o que foi criado no arquivo DELETEUser.request.js:
O arquivo ficará assim:

> import * as DELETEUser from '../requests/DELETEUser.request'
>
> describe('Delete User', () => {
>     it('Deletando um User', () => {
>        DELETEUser.DELETEUsers().should((resDeleteUser) => {
>            expect(resDeleteUser.status).to.eq(204)
>        })
>    })          
> })        

E enfim, na pasta addload, criarei 2 arquivos .json. Nessa pasta eu criei um arquivo de newuser, onde adicionei novas infos para fazer o POST request.
Nesse arquivo, consta dos dados necessários para se interagir com a GOREST. É necessário atualiza-lo em cada interação com post, pois sem isso, dará erro de usuário já cadastrado. 

O arquivo new user encontra-se assim:

> {
>    "id": 2147,
>    "name": "Lara monteiro",
>    "email": "2147@gmail.com",
>    "gender": "female",
>    "status": "active"
> }

Os testes saíram de acordo com o esperado. Quando fiz a requisição de GET, a API me retorna uma mensagem de acerto, informando que obtive uma resposta 200. 
Já quando fui testar o POST, obtive o mesmo sucesso (201). Consegui adicionar um novo usuário na API importando do arquivo newuser.json. 
E por último, o DELETE. 
Ao fazer a requisição de DELETE, utilizei o último usuário criado por mim, me baseando no horario (2147). Ao realizar, a API me retornou uma mensagem de acerto, que de acordo com a API corresponde a 204.
* Checar documentação da GO REST para mais informações.
Utilizei a propria documentação da API para me basear nas respostas.
