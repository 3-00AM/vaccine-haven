
describe("renders login page with the correct components", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.get("#nav__logIn__link").click()
        cy.wait(1000)
    })
    it("renders login section", () => {
        cy.get("#citizen_id").should("exist")
        cy.get("#login__btn").should("exist")
    })

    it("renders navbar", () => {
        cy.get(".header-brand").should("exist")
        cy.get("#header-menu").should("exist")
        cy.get('#nav__site__link').should("exist");
        cy.get('#nav__register__link').should("exist");
        cy.get('#nav__logIn__link').should("exist");
    })

})