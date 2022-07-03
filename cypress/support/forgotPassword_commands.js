import forgotPasswordLocators from './locators/forgotPassword';

Cypress.Commands.add('fillForgotPasswordForm', (email) => {
    cy.get(forgotPasswordLocators.emailInput).type(email + '{enter}');
});
