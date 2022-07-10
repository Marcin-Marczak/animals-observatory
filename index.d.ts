/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject = any> {
        /**
         * Custom command to ... add your description here
         * @example cy.clickOnMyJourneyInCandidateCabinet()
         */
        createTimestamp(): Chainable<null>;
        acceptCookies(): Chainable<null>;
        openMainPage(): Chainable<null>;
        openSignInPage(): Chainable<null>;
        openAccountInformationPage(): Chainable<null>;
        openForgotPasswordPage(): Chainable<null>;
        signIn(email, password): Chainable<null>;
        changeFirstNameLastName(firstName, lastName): Chainable<null>;
        fillForgotPasswordForm(email): Chainable<null>;
        openCategoryPage(): Chainable<null>;
        acceptCookies(): Chainable<null>;
        getFirstProductName(): Chainable<null>;
        goToFirstProductPage(): Chainable<null>;
        selectFirstProductVariant(): Chainable<null>;
        addProductToCart(): Chainable<null>;
        goToCart(): Chainable<null>;
    }
}
