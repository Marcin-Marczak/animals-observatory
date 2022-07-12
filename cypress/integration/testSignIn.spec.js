import password from '../../password';
import signInLocators from '../support/locators/signIn';
import commonLocators from '../support/locators/common';

describe('Sign in process', () => {
    beforeEach(function () {
        cy.openSignInPage();
        cy.acceptCookies();

        cy.fixture('errors').then((error) => {
            cy.fixture('user').then((user) => {
                this.error = error;
                this.user = user;
            });
        });
    });

    it('Sign in - valid data', function () {
        const validEmail = this.user.email;
        const validPassword = password.validPassword;

        cy.fixture('urls').then((url) => {
            cy.intercept('GET', url.api.customer).as('loggedUser');
        });

        cy.signIn(validEmail, validPassword);

        cy.wait('@loggedUser', { timeout: 10000 })
            .its('response.body.customer.isLoggedIn')
            .should('eq', true);

        cy.get(signInLocators.submitButton).should('not.exist');
    });

    it('Sign in - invalid email', function () {
        const invalidEmail = this.user.email + 'test';
        const validPassword = password.validPassword;

        cy.fixture('urls').then((url) => {
            cy.intercept('GET', url.api.customer).as('loggedUser');
        });

        cy.signIn(invalidEmail, validPassword);

        cy.wait('@loggedUser', { timeout: 10000 })
            .its('response.body.customer.isLoggedIn')
            .should('eq', false);

        cy.get(commonLocators.displayedText)
            .should('exist')
            .and('have.text', this.error.loginError);
    });

    it('Sign in - invalid password', function () {
        const validEmail = this.user.email;
        const invalidPassword = password.validPassword + 'test';

        cy.fixture('urls').then((url) => {
            cy.intercept('GET', url.api.customer).as('loggedUser');
        });

        cy.signIn(validEmail, invalidPassword);

        cy.wait('@loggedUser', { timeout: 10000 })
            .its('response.body.customer.isLoggedIn')
            .should('eq', false);

        cy.get(commonLocators.displayedText)
            .should('exist')
            .and('have.text', this.error.loginError);
    });

    it('Sign in - invalid email format', function () {
        const invalidEmailFormat = this.user.email.replace('@', '');
        const validPassword = password.validPassword;

        cy.signIn(invalidEmailFormat, validPassword);

        cy.get(signInLocators.emailError)
            .should('exist')
            .and('have.text', this.error.invalidEmailFormat);
    });

    it('Sign in - blank email', function () {
        const blankEmail = '{backspace}';
        const invalidPassword = password.validPassword + 'test';

        cy.signIn(blankEmail, invalidPassword);

        cy.get(signInLocators.emailError)
            .should('exist')
            .and('have.text', this.error.requiredField);
    });

    it('Sign in - blank password', function () {
        const validEmail = this.user.email;
        const blankPassword = '{backspace}';

        cy.signIn(validEmail, blankPassword);

        cy.get(signInLocators.passwordError)
            .should('exist')
            .and('have.text', this.error.requiredField);
    });

    it('Sign in - blank email and password', function () {
        const blankEmail = '{backspace}';
        const blankPassword = '{backspace}';
        const locators = [signInLocators.emailError, signInLocators.passwordError];

        cy.signIn(blankEmail, blankPassword);

        locators.forEach(locator => {
            cy.get(locator)
                .should('exist')
                .and('have.text', this.error.requiredField);
        });
    });
});
