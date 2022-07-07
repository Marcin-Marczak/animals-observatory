import password from '../../password';
import commonLocators from '../support/locators/common';

describe('User Account', () => {
    beforeEach(function () {
        cy.openSignInPage();
        cy.acceptCookies();


        cy.fixture('confirmations').then((confirmation) => {
            cy.fixture('user').then((user) => {
                cy.signIn(user.email, password.validPassword);
                this.confirmation = confirmation;
                this.user = user;
            });
        });

        cy.openAccountInformationPage();

        cy.createTimestamp().as('timestamp');
    });

    it('Change user first name and last name - valid data', function () {
        const firstName = this.user.firstName + '_' + this.timestamp;
        const lastName = this.user.lastName + '_' + this.timestamp;
        const fullName = firstName + ' ' + lastName;

        cy.changeFirstNameLastName(firstName, lastName);

        cy.wait('@userData', { timeout: 10000 })
            .its('response.body.customer.fullname')
            .should('eq', fullName);

        cy.get(commonLocators.displayedText)
            .should('exist')
            .and('have.text', this.confirmation.accountInformationSaved);
    });
});
