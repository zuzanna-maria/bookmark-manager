describe("Someone is already signed up test:", function() {

    beforeEach(function() {
      cy.task('resetUser')  
      cy.task("seedExampleUser")
      cy.task("resetDb")
      cy.task("seedDb")
    })

    it("Go to index page, should see sign up link:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
    })

    it("Go to index page, click sign in link:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').should('be.visible')
        cy.get('#password-textbox').should('be.visible')
        cy.get('#submit-button').should('contain','Submit')
        cy.url().should('contain', '/signin')
    })

    it("Fill sign in form correctly, should go to bookmarks:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random@gmail.com')
        cy.get('#password-textbox').type('password')
        cy.get('#submit-button').click()
        cy.url().should('contain', '/bookmarks')
    })

    it("Fill sign up form incorrectly, wrong password:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign Up')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random@gmail.com')
        cy.get('#password-textbox').type('1111')
        cy.get('#submit-button').click()
        cy.contains('Password invalid')
        cy.url().should('contain', '/signin')
    })

    it("Fill sign up form incorrectly, wrong email:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign Up')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random1@gmail.com')
        cy.get('#password-textbox').type('password')
        cy.get('#submit-button').click()
        cy.contains('Email not recognised, please sign up')
        cy.url().should('contain', '/signin')
    })

    it("Fill sign in form correctly, then sign out from bookmarks:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random@gmail.com')
        cy.get('#password-textbox').type('password')
        cy.get('#submit-button').click()
        cy.url().should('contain', '/bookmarks')
        cy.get('#sign-out-button').click()
        cy.contains('Sign In')
    })

    it("Fill sign in form correctly, then sign out from comments:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random@gmail.com')
        cy.get('#password-textbox').type('password')
        cy.get('#submit-button').click()
        cy.url().should('contain', '/bookmarks')
        cy.get('#bookmark-0-add-comment').click()
        cy.get('#sign-out-button').click()
        cy.contains('Sign In')
    })

    it("Fill sign in form correctly, then sign out from edit:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random@gmail.com')
        cy.get('#password-textbox').type('password')
        cy.get('#submit-button').click()
        cy.url().should('contain', '/bookmarks')
        cy.get('#bookmark-0-edit').click()
        cy.get('#sign-out-button').click()
        cy.contains('Sign In')
    })

    it("Fill sign in form correctly, then sign out from tags:", function(){
        cy.visit('/')
        cy.get('#sign-in-link').should('contain','Sign In')
        cy.get('#sign-in-link').click()
        cy.get('#email-textbox').type('random@gmail.com')
        cy.get('#password-textbox').type('password')
        cy.get('#submit-button').click()
        cy.url().should('contain', '/bookmarks')
        cy.get('#bookmark-textbox').type("www.bbc.com")
        cy.get('#bookmark-tags-textbox').type("news uk")
        cy.get('#bookmark-submit').click() 
        cy.get('#bookmarks-tags-1').click()
        cy.get('#sign-out-button').click()
        cy.contains('Sign In')
    })

})
  