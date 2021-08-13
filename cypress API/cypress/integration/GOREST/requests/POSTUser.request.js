const newuser = require('../Addloads/newuser.json')
//const access_token = require('../Support/utilis')

function GetUsers() {
    return cy.request({
        method: 'POST',
        url: '/users/',
        // Caso queria adicionar mais um usuário, direcionar para a página Addloads > newuser.json
        // Lembrando que: o ID e o email devem ser unicos, não podem já existir no banco de dados.
        auth: {
            bearer: 'c663ac9c6dd00e3344c3a9538c195a757df6be6a0ca4f80c54ffe179b8d59cdb'           
        },
        // Token da API. Ao testar, criar uma conta na aplicação e substituir pela KEY gerada pela sua conta.
        
        body: newuser
    })
}
export {GetUsers}
