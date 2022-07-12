import signInLocators from '../locators/signIn';

Cypress.Commands.add('signIn', (email, password) => {
    cy.get(signInLocators.emailInput).type(email);
    cy.get(signInLocators.passwordInput).type(password, { log: false });
    cy.get(signInLocators.submitButton).click();
});
