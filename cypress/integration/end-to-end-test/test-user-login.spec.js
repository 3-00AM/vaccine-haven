describe("user should be able to get to login page", () => {

    beforeEach(() => {
        cy.visit('/');
        cy.wait(1000)
        cy.get('#nav__logIn__link').click();
        cy.wait(1000)
    })
    it("should have the citizen in the database", () => {
        // cy.visit('/');
        // cy.wait(1000)
        // cy.get('#nav__logIn__link').click();
        // cy.wait(1000)
        cy.get('#nav__logIn__link').click();
        cy.get('#citizen_id').type('8023525444082')
        cy.get('#login__btn').click()
    })
})