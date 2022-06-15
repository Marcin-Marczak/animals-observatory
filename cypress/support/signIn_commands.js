import mainPageLocators from "./locators/mainPage";
import signInLocators from "./locators/signIn";

Cypress.Commands.add('signIn', (email, password, isLoggedIn, isErrorTextExist) => {
    cy.get(signInLocators.emailInput).type(email);
    cy.get(signInLocators.passwordInput).type(password, { log: false });

    cy.fixture('urls.json').then((data) => {
        cy.intercept('GET', data.api.customer).as('loggedUser');
    })

    cy.get(signInLocators.submitButton).click();

    cy.wait('@loggedUser', { timeout: 10000 })
        .its('response.body.customer.isLoggedIn')
        .should('eq', isLoggedIn);

    cy.findByText(mainPageLocators.incorrectSignInText).should(isErrorTextExist);
});
