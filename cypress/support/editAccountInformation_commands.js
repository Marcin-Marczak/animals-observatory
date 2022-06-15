import editAccountInformationLocators from "./locators/editAccountInformation";

Cypress.Commands.add('changeFirstNameLastName', (unique, isChanged) => {
    cy.fixture('user.json').then((user) => {
        cy.fixture('urls.json').then((url) => {
            const firstName = user.firstName + '_' + unique;
            const lastName = user.lastName + '_' + unique;
            const fullName = firstName + ' ' + lastName;

            cy.get(editAccountInformationLocators.currentPasswordInput).should('not.be.visible');
            cy.get(editAccountInformationLocators.firstNameInput).fill(firstName);
            cy.get(editAccountInformationLocators.lastNameInput).fill(lastName);

            cy.intercept('GET', url.api.customer).as('userData');

            cy.get(editAccountInformationLocators.saveButton).click();

            cy.wait('@userData', { timeout: 10000 })
                .its('response.body.customer.fullname')
                .should('eq', fullName);

            cy.findByText(editAccountInformationLocators.savedConfirmationText).should(isChanged);
        });
    });
})



