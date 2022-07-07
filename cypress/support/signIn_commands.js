import signInLocators from './locators/signIn';

Cypress.Commands.add('signIn', (email, password) => {
    cy.get(signInLocators.emailInput).type(email);
    cy.get(signInLocators.passwordInput).type(password, { log: false });

    cy.fixture('urls').then((url) => {
        cy.intercept('GET', url.api.customer).as('loggedUser');
    });

    cy.get(signInLocators.submitButton).click();
});
