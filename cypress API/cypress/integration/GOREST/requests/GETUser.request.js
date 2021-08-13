
function AllUsers() {
    return cy.request({
        method: 'GET',
        url: '/users/',
        failOnStatusCode: false
    })
}

export{AllUsers}