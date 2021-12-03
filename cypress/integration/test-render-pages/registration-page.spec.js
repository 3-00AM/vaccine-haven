beforeEach(() => {
    cy.visit("/registration")
})

describe("renders main features of registration page", () => {
    it("renders a pad for form", () => {
        cy.get(".padded").should("exist")
    })

    it("renders a field to input citizen id", () => {
        cy.get("#citizen_id").should("exist")
    })

    it("renders a field to input name of the citizen", () => {
        cy.get("#name").should("exist")
    })

    it("renders a field to input surname of the citizen", () => {
        cy.get("#surname").should("exist")
    })

    it("renders a calendar picker to input the birthdate of the citizen", () => {
        cy.get("#birth_date").should("exist")
    })

    it("renders a field to input the occupation of the citizen", () => {
        cy.get("#occupation").should("exist")
    })

    it("renders a field to input the phone number of the citizen", () => {
        cy.get("#phone_number").should("exist")
    })

    it("renders a field to input the address of the citizen", () => {
        cy.get("#address").should("exist")
    })

    it("renders a checkbox for approving that the citizen is in the group of risk people", () => {
        cy.get("#check-info").should("exist")
        cy.get(".form-ext-label").should("exist")
    })

    it("renders a button for submit", () => {
        cy.get("#register__btn").should("exist")
    })
})