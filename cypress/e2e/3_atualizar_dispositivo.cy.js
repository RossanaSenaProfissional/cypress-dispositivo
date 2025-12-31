/// <reference types="cypress" />

describe('Atualizar dispositivos', () => {

    it('Atualizar dispositivo com sucesso', () => {
        const dispositivoInicial = {
            name: "Dispositivo",
            data: {
                year: 2024,
                price: 50.00,
                "CPU model": "Inicial",
                "Hard disk size": "500 GB"
            }
        }
        cy.request({
            method: 'POST',
            url: 'https://api.restful-api.dev/objects',
            body: dispositivoInicial
        })
            .then((respostaPost) => {
                expect(respostaPost.status).to.eq(200)
                expect(respostaPost.body.id).to.not.be.empty

                const dispositivoAtualizado = {
                    name: "Dispositivo Atualizado",
                    data: {
                        year: 2025,
                        price: 99.99,
                        "CPU model": "Atualizado",
                        "Hard disk size": "1 TB"
                    }
                }
                const idDispositivo = respostaPost.body.id
                cy.request({
                    method: 'PUT',
                    url: `https://api.restful-api.dev/objects/${idDispositivo}`,
                    body: dispositivoAtualizado
                })
                    .then((respostaPut) => {
                        expect(respostaPut.status).to.equal(200)
                        expect(respostaPut.body.id).to.equal(idDispositivo)
                        expect(respostaPut.body.name).to.equal(dispositivoAtualizado.name)
                        expect(respostaPut.body.data.year).to.equal(dispositivoAtualizado.data.year)
                        expect(respostaPut.body.data.price).to.equal(dispositivoAtualizado.data.price)
                    })
            })
    })
})