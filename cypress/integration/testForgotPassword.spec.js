import commonLocators from '../support/locators/common';
import forgotPasswordLocators from '../support/locators/forgotPassword';

describe('Forgot password', () => {
    beforeEach(function () {
        cy.openForgotPasswordPage();
        cy.acceptCookies();

        cy.fixture('signIn.json').then((data) => {
            cy.fixture('urls.json').then((url) => {
                cy.fixture('confirmations.json').then((text) => {
                    cy.fixture('errors.json').then((error) => {
                        this.data = data;
                        this.url = url;
                        this.text = text;
                        this.error = error;
                    });
                });
            });
        });
    });

    it('Reset password - valid email', function () {
        cy.intercept('GET', this.url.api.customer).as('form');

        cy.fillForgotPasswordForm(this.data.email);

        cy.wait('@form', { timeout: 10000 })
            .its('response.statusCode')
            .should('eq', 200);

        cy.get(commonLocators.displayedText).should('contain.text', this.text.resetPasswordLinkSent);
    });

    it('Reset password - invalid email', function () {
        cy.fillForgotPasswordForm(this.data.email.replace('@', ''));

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
