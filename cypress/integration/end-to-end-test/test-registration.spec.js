
beforeEach(() => {
    cy.visit('/');
})

describe("Register a citizen to database", () => {
    it("should send POST request with the citizen information to government", () => {
        // cy.fixture('mock-citizen-info').then((mock) => {
        //     const feedback = mock[1]
        //     cy.intercept('POST', '/registration', {
        //         statusCode: 201,
        //         body: {
        //           response: {feedback}
        //         },
        //       })
        //     })

            // console.log(response)


            cy.get('#nav__register__link').click();
            // cy.wait('@registration-page')
            cy.wait(200)
            cy.get('#citizen_id').type('8023525444082');
            cy.wait(200)
            cy.get('#name').type('Amber');
            cy.wait(200)
            cy.get('#surname').type('Smith');
            cy.wait(200)
            cy.get('#birth_date').type('1999-07-07');
            cy.wait(200)
            cy.get('#occupation').type('Student');
            cy.wait(200)
            cy.get('#phone_number').type('0910009900');
            cy.wait(200)
            cy.get('#address').type('on the ground');
            cy.wait(200)
            cy.get('#register__btn').click();
            cy.wait(800)
        })

        it("should have the citizen in the database", () => {
            cy.get('#nav__logIn__link').click();
            cy.get('#citizen_id').type('8023525444082')
            cy.get('#login__btn').click()
        })

})