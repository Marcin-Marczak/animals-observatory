import cartLocators from '../support/locators/cart';

describe('Cart', () => {
    it('Add item to cart', () => {
        cy.openCategoryPage();
        cy.acceptCookies();

       cy.getFirstProductName().as('firstProductName');

       cy.goToFirstProductPage();
       cy.selectFirstProductVariant();

       cy.fixture('urls')
           .then((url) => {
               cy.intercept('GET', url.api.cart).as('cart');
       });

        cy.addProductToCart();
        cy.goToCart();

        cy.get('@firstProductName')
            .then((productName) => {
                cy.get(cartLocators.productInCart)
                    .should('have.text', productName);
        });

        cy.wait('@cart', { timeout: 20000 })
            .its('response.body.cart.summary_count')
            .should('eq', 1);
        });
});
