const infousers = require('../Addloads/infousers.json')

function DELETEUsers(idUser) {
    return cy.request({
        method: 'DELETE',
        //url: `users/${idUser}`,
        url: '/users/2147/',
        // ID 2147 foi o último ID que criei com dados que podem ser encontrados na pasta Addloads > newuser.json
        // O teste de DELETE realizado com ele foi um sucesso.
        auth: {
            bearer: 'c663ac9c6dd00e3344c3a9538c195a757df6be6a0ca4f80c54ffe179b8d59cdb'

        },
        //body: infousers,
        failOnStatusCode: false
    
    })
} 
export {DELETEUsers}