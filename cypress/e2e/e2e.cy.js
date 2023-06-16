/// <reference types="cypress" />
let dadosLogin



context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    });

    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })
    });


    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        //Clicar na página de produtos
        cy.get('#primary-menu > .menu-item-629 > a').click()

        //Adicionar primeiro produto ao carrinho
        cy.addProdutos('Atlas Fitness Tank', 'XS', 'Blue', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()


        //Adicionar segundo produto ao carrinho
        cy.addProdutos('Abominable Hoodie', 'XS', 'Blue', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        //Adicionar terceiro produto ao carrinho
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Atomic Endurance Running Tee (Crew-Neck)', 'XS', 'Blue', 1)
        cy.get('#primary-menu > .menu-item-629 > a').click()

        //Adicionar quarto produto ao carrinho
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos('Augusta Pullover Jacket', 'XL', 'Blue', 1)

        //Clicar no carrinho
        cy.get('.woocommerce-message > .button').click()

        //Clicar em concluir compra
        cy.get('.checkout-button').click()

        //acitar os termos de condiçoes do site
        cy.get('#terms').click()

        //Clicar em finalizar compra
        cy.get('#place_order').click()

        //Mensagem de conclusão da compra
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

    });

})