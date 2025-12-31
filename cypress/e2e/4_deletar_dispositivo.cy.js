/// <reference types="cypress" />

const dispositivoDeletado = {
    name: "Dispositivo a ser deletado",
    data: {
        year: 2024,
        price: 50.00,
        "CPU model": "Inicial",
        "Hard disk size": "500 GB"
    }
}

describe('Deletar dispositivos', () => {

    it('Deletar dispositivo com sucesso', () => {

        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: dispositivoDeletado
        })
            .then((respostaPost) => {
                expect(respostaPost.status).to.equal(200)
                expect(respostaPost.body.id).to.not.be.empty

                const idDispositivoDeletado = respostaPost.body.id

                cy.request({
                    method: 'DELETE',
                    url: `https://api.restful-api.dev/objects/${idDispositivoDeletado}`
                })
                    .then((respostaDelete) => {
                        expect(respostaDelete.status).to.equal(200)
                        expect(respostaDelete.body.message).to.equal(`Object with id = ${idDispositivoDeletado} has been deleted.`)
                    })

                cy.request({
                    method: 'GET',
                    url: `https://api.restful-api.dev/objects/${idDispositivoDeletado}`,
                    failOnStatusCode: false
                })
                    .then((respostaGet) => {
                        expect(respostaGet.status).to.equal(404)
                    })
            })
    })
})