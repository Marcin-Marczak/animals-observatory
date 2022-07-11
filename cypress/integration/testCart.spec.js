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

                cy.wait('@cart', { timeout: 10000 }).its('response.body').then((res) => {
                    expect(res.cart.summary_count).to.eq(1);
                    expect(res.cart.items[0].product_name).to.eq(productName);
                });
        });
    });
});
