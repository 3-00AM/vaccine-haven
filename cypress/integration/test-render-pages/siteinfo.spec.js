
beforeEach(() => {
    cy.visit('/site')
})

describe("go to site information page", () => {
    it("renders navbar", () => {
        cy.get(".header-brand").should("exist")
        cy.get("#header-menu").should("exist")
        cy.get('#nav__site__link').should("exist");
        cy.get('#nav__register__link').should("exist");
        cy.get('#nav__logIn__link').should("exist");
    })

    it("renders sites stations", () => {
        cy.get(".p-1").should('exist')
        cy.findByText('สถานีกลางบางซื่อ').should('exist')
        cy.findByText('เซ็นทรัลพลาซา เวสเกต').should('exist')
        cy.findByText('ศูนย์กีฬากำธน สินธวานนท์ กฟผ.').should('exist')
        cy.findByText('ราชวิทยาลัยจุฬาภรณ์').should('exist')
        cy.findByText('มหาวิทยาลัยเกษตรศาสตร์').should('exist')
        cy.findByText('มหาวิทยาลัยธรรมศาสตร์ ท่าพระจันทร์').should('exist')
        cy.findByText('มหาวิทยาลัยศรีนครินทรวิโรฒ').should('exist')
        cy.findByText('OGYHSite').should('exist')
    })

})