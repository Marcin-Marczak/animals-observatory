import password from "../../password";
import editAccountInformationLocators from "../support/locators/editAccountInformation";

describe('User Account', () => {
    beforeEach(function () {
        cy.openSignInPage();
        cy.acceptCookies();

        cy.fixture('signIn.json').then((user) => {
            cy.signIn(user.email, password.validPassword)
        });
        cy.openAccountInformationPage();

        cy.createTimestamp().as('timestamp');
    })

    it('Change user - valid first name and last name', function () {
        cy.changeFirstNameLastName(this.timestamp, 'exist');

        cy.findByText(editAccountInformationLocators.savedConfirmationText).should(isChanged)
    });
});
