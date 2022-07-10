import commonLocators from '../support/locators/common';
import forgotPasswordLocators from '../support/locators/forgotPassword';

describe('Forgot password', () => {
    beforeEach(function () {
        cy.openForgotPasswordPage();
        cy.acceptCookies();

        cy.fixture('confirmations').then((confirmation) => {
            cy.fixture('errors').then((error) => {
                cy.fixture('urls').then((url) => {
                    cy.fixture('user').then((user) => {
                        this.confirmation = confirmation;
                        this.error = error;
                        this.url = url;
                        this.user = user;
                    });
                });
            });
        });
    });

    it.only('Reset password - valid email', function () {
        cy.intercept('GET', this.url.api.customer).as('form');

        cy.fillForgotPasswordForm(this.user.email);

        cy.wait('@form', { timeout: 10000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get(commonLocators.displayedText).should('contain.text', this.confirmation.resetPasswordLinkSent);
    });

    it('Reset password - invalid email', function () {
        cy.fillForgotPasswordForm(this.user.email.replace('@', ''));

        cy.get(forgotPasswordLocators.emailError)
            .should('exist')
            .and('have.text', this.error.invalidEmailFormat);
    });

    it('Reset password - blank email', function () {
        cy.fillForgotPasswordForm('{backspace}');

        cy.get(forgotPasswordLocators.emailError)
            .should('exist')
            .and('have.text', this.error.requiredField);
    });
});
