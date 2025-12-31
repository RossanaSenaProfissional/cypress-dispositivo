/// <reference types="cypress"/>

describe('Buscar dispositivos', () => {

    const dispositivo = {
        "id": "ff8081819782e69e019b21f25fa37599",
        "name": "Teste Adicionar Produto Novamente",
        "data": {
            "year": 2025,
            "price": 99.99,
            "CPU model": "Produto teste",
            "Hard disk size": "1 TB"
        }
    }
    it('Buscar dispositivo existente', () => {
        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${dispositivo.id}`
        })
            .then((respostaGet) => {
                expect(respostaGet.status).to.equal(200)
                expect(respostaGet.body.id).to.equal(dispositivo.id)
                expect(respostaGet.body.name).to.equal(dispositivo.name)
            })
    })

    const idInexistente = 'abc'
    it('Buscar dispositivo inexistente', () => {
        cy.request({
            method: 'GET',
            url: `https://api.restful-api.dev/objects/${idInexistente}`,
            failOnStatusCode: false
        })
            .then((respostaDispositivoInexistente) => {
                expect(respostaDispositivoInexistente.status).to.equal(404)
                expect(respostaDispositivoInexistente.body.error).to.equal(`Oject with id=${idInexistente} was not found.`)
            })
    })
})