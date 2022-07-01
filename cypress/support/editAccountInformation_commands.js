import editAccountInformationLocators from './locators/editAccountInformation';

Cypress.Commands.add('changeFirstNameLastName', (firstName, lastName) => {
            cy.get(editAccountInformationLocators.currentPasswordInput).should('not.be.visible');
            cy.get(editAccountInformationLocators.firstNameInput).fill(firstName);
            cy.get(editAccountInformationLocators.lastNameInput).fill(lastName);

            cy.fixture('urls.json').then((url) => {
                cy.intercept('GET', url.api.customer).as('userData');
            });

            cy.get(editAccountInformationLocators.saveButton).click();
});
