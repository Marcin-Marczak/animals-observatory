require('@4tw/cypress-drag-drop');
require('cypress-commands');
import '@testing-library/cypress/add-commands';
import mainPageLocators from "./locators/mainPage";

Cypress.Commands.add('acceptCookies', () => {
    cy.get(mainPageLocators.acceptCookiesButton).click();
});

Cypress.Commands.add('openMainPage', () => {
    cy.visit('/');
});

Cypress.Commands.add('openSignInPage', () => {
    cy.fixture('urls.json').then((data) => {
       cy.visit(data.signIn);
    })
});
