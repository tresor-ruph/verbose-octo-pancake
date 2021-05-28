describe("Page2", () => {

    beforeEach(() => {
        cy.visit('/')
    })
    it("navbar works as needed" , () => {
        cy.findAllByText('Create an account').should("exist")
        
    });
    it("routes to a signup page", () => {
        cy.findAllByText('Create an account').click()
        

    })
    it("usage condition link works", () => {
        cy.findAllByText('Create an account').click()
        cy.findAllByText('private policy').should("exist")
        
    })
    it('opens privacy modal', () => {
        cy.findAllByText('Create an account').click()
        cy.findAllByText('private policy').should("exist")
        cy.findAllByText('private policy').click()
    })
    it("closes privacy modal", () => {
        cy.findAllByText('Create an account').click()
        cy.findAllByText('private policy').should("exist")
        cy.findAllByText('private policy').click()
        cy.findAllByText('close').should('exist')
        cy.findAllByText('close').click()
    })
    it('opens terms and condition modal', () => {
        cy.findAllByText('Create an account').click()
        cy.findAllByText('terms and condition').should("exist")
        cy.findAllByText('terms and condition').click()
    })
    it("closes terms and conditiony modal", () => {
        cy.findAllByText('Create an account').click()
        cy.findAllByText('terms and condition').should("exist")
        cy.findAllByText('terms and condition').click()
        cy.findAllByText('close').should('exist')
        cy.findAllByText('close').click()
    })
    

})