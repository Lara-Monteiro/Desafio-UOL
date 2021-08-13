import * as GETUser from '../requests/GETUser.request'

describe('GET User', () => {
        it('Requisitando usuários', () =>{
            GETUser.AllUsers().should((response) => {
                expect(response.body)
                expect(response.status).to.eq(200)
                expect(response.body).to.be.not.null


            })
        })
})