
beforeEach(() => {
    cy.visit('/');
    cy.get('#nav__logIn__link').click();
})

    it("should have the citizen in the database", () => {
        cy.get('#nav__logIn__link').click();
        cy.get('#citizen_id').type('8023525444082')
        cy.get('#login__btn').click()
    })