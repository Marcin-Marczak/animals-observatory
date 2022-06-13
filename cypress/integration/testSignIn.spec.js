import password from "../../password";

describe('Sign in process', () => {
    beforeEach(function () {
        cy.openSignInPage();
        cy.acceptCookies();

        cy.fixture('signIn.json').then((data) => {
            this.data = data
        });
    })

    it('Sign in - valid data', function () {
        const validEmail = this.data.email;
        const validPassword = password.validPassword;

        cy.signIn(validEmail, validPassword, true, 'not.exist');
    });

    it('Sign in - invalid email', function () {
        const invalidEmail = this.data.email + 'test';
        const validPassword = password.validPassword;

        cy.signIn(invalidEmail, validPassword, 'false', 'exist');
    });

    it('Sign in - invalid password', function () {
        const validEmail = this.data.email;
        const invalidPassword = password.validPassword + 'test';

        cy.signIn(validEmail, invalidPassword, 'false', 'exist');
    });
});
