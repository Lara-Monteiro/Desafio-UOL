import * as DELETEUser from '../requests/DELETEUser.request'

describe('Delete User', () => {
    it('Deletando um User', () => {
        DELETEUser.DELETEUsers().should((resDeleteUser) => {
            expect(resDeleteUser.status).to.eq(204)
        })
    })          
})        
          