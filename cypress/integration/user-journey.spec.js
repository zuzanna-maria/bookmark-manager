describe("User journey tests:", function(){

    beforeEach(function() {
        cy.task("resetDb")
      })

    it("Go to index page, should see sign up link:", function(){
        cy.visit('/')
        cy.get('#sign-up-link').should('contain','Sign Up')
    })

    it("Go to bookmarks, not sign in, should be redirected to index:", function(){
        cy.visit('/bookmarks')
        cy.get('#sign-up-link').should('contain','Sign Up')
    })

    it("Go to tags, not sign in, should be redirected to index:", function(){
        cy.visit('/tags/:name')
        cy.get('#sign-up-link').should('contain','Sign Up')
    })

    it("Go to index page, click sign up link:", function(){
        cy.visit('/')
        cy.get('#sign-up-link').should('contain','Sign Up')
        cy.get('#sign-up-link').click()
        cy.get('#email-textbox').should('be.visible')
        cy.get('#password-textbox').should('be.visible')
        cy.get('#submit-button').should('contain','Submit')
        cy.url().should('contain', '/signup')
    })

    it("Fill sign up form correctly, should go to bookmarks:", function(){
        cy.visit('/')
        cy.get('#sign-up-link').should('contain','Sign Up')
        cy.get('#sign-up-link').click()
        cy.get('#email-textbox').type('jj@hotmail.com')
        cy.get('#password-textbox').type('1111')
        cy.get('#submit-button').click()
        cy.url().should('contain', 'signup/confirmation')
        cy.get('#Continue').click()
        cy.url().should('contain', '/bookmarks')
    })

    it("Fill sign up form incorrectly, should go to bookmarks:", function(){
        cy.visit('/')
        cy.get('#sign-up-link').should('contain','Sign Up')
        cy.get('#sign-up-link').click()
        cy.get('#email-textbox').type('jj')
        cy.get('#password-textbox').type('1111')
        cy.get('#submit-button').click()
        cy.contains('Email invalid')
        cy.url().should('contain', '/signup')
    })

    it("Can navigate the app once signed in correctly:", function(){
        cy.visit('/')
        cy.get('#sign-up-link').should('contain','Sign Up')
        cy.get('#sign-up-link').click()
        cy.get('#email-textbox').type('jj@hotmail.com')
        cy.get('#password-textbox').type('1111')
        cy.get('#submit-button').click()
        cy.get('#Continue').click()
        cy.url().should('contain', '/bookmarks')
        cy.get('#bookmark-textbox').type('google.com')
        cy.get('#bookmark-submit').click()
        cy.contains('google.com')
    })
})
