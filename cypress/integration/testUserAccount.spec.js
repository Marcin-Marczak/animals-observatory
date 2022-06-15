import password from "../../password";

describe('User Account', () => {
    beforeEach(function () {
        cy.openSignInPage();
        cy.acceptCookies();

        cy.fixture('signIn.json').then((user) => {
            cy.signIn(user.email, password.validPassword, true, 'not.exist')
        });
        cy.openAccountInformationPage();

        cy.createTimestamp().as('timestamp');
    })

    it('Change user - valid first name and last name', function () {
        cy.changeFirstNameLastName(this.timestamp, 'exist');
    });
});
