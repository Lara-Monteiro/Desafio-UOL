import * as POSTUser from '../requests/POSTUser.request'

describe('POST User', () => {
    it("Adicionando um User novo", () => {
        POSTUser.GetUsers().should((response) => {
            expect(response.status).to.eq(201)
            //expect(response.body.id).to.eq(202);
            
        })
    })
})