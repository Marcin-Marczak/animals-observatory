import password from "../../password";
import commonLocators from "../support/locators/common";

describe('User Account', () => {
    beforeEach(function () {
        cy.openSignInPage();
        cy.acceptCookies();

        cy.fixture('signIn.json').then((user) => {
            cy.fixture('user.json').then((data) => {
                cy.fixture('confirmations.json').then((text) => {
                    cy.signIn(user.email, password.validPassword)
                    this.data = data
                    this.text = text
                })
            });
        });

        cy.openAccountInformationPage();

        cy.createTimestamp().as('timestamp');
    })

    it('Change user first name and last name - valid data', function () {
        const firstName = this.data.firstName + '_' + this.timestamp;
        const lastName = this.data.lastName + '_' + this.timestamp;
        const fullName = firstName + ' ' + lastName;

        cy.changeFirstNameLastName(firstName, lastName);

        cy.wait('@userData', { timeout: 10000 })
            .its('response.body.customer.fullname')
            .should('eq', fullName);

        cy.get(commonLocators.displayedText)
            .should('exist')
            .and('have.text', this.text.accountInformationSaved);
    });
});
