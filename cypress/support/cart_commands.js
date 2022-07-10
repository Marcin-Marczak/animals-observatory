import cartLocators from './locators/cart';

Cypress.Commands.add('getFirstProductName', () => {
    cy.get(cartLocators.product).eq(0).text();
});

Cypress.Commands.add('goToFirstProductPage', () => {
    cy.get(cartLocators.product).eq(0).click();
});

Cypress.Commands.add('selectFirstProductVariant', () => {
    cy.get(cartLocators.productOption).eq(0).click();
});

Cypress.Commands.add('addProductToCart', () => {
    cy.get(cartLocators.addToCartButton).click();
});

Cypress.Commands.add('goToCart', () => {
    cy.get(cartLocators.goToCartLink)
        .should('be.visible')
        .click();
});
