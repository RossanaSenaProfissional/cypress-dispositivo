/// <reference types="cypress"/>

describe('Cadastrar dispositivos', () => {
    
    const Dispositivo = {
            "name": "Teste Cadastrar Produto",
            "data": {
                "year": 2025,
                "price": 99.99,
                "CPU model": "Produto Cadstado Teste",
                "Hard disk size": "1 TB"
            }
        }
    it('Cadastrar dispositivo com sucesso', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: Dispositivo
        })
            .then((respostaPost) => {
                expect(respostaPost.status).to.equal(200)
                expect(respostaPost.body.id).not.to.empty
                expect(respostaPost.body.createdAt).not.to.empty
                expect(respostaPost.body.name).to.equal(Dispositivo.name)
                expect(respostaPost.body.data.year).to.equal(Dispositivo.data.year)
            })
    })
})