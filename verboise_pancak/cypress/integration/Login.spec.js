describe("page 1", () => {

    beforeEach(() => {
        cy.visit('/')
    })
    it("Login renders correctly" , () => {
        cy.get(".login-i").should("exist")
        cy.get("#username").should("exist")
    });

    it("routes to a forgot password page", ()=>{
        cy.findAllByText('Forgot Password').should("exist")
        cy.findAllByText('Forgot Password').click();
        cy.url().should("include", "resetpassword/user")
        cy.findAllByText('Reset Password').click("");


    })


})