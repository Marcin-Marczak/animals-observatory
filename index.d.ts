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
        signIn(email, password): Chainable<null>;
        changeFirstNameLastName(unique, isChanged): Chainable<null>;
    }
}
