describe("renders the homepage", () => {
    beforeEach(() => {
        cy.visit("/")
        cy.wait(1000)
    })
    it("renders navbar", () => {
        cy.get(".header-brand").should("exist")
        cy.get("#header-menu").should("exist")
        cy.get('#nav__site__link').should("exist");
        cy.get('#nav__register__link').should("exist");
        cy.get('#nav__logIn__link').should("exist");
    })

    it("register link and reservation link at the bottom of the page", () => {
        cy.get("#register__link").should("exist")
        cy.get("#check_site__link").should("exist")
    })
})