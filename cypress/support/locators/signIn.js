const signInLocators = {
    emailInput : '#email',
    passwordInput: '[name="login[password]"]',
    submitButton: '.login[name="send"]',
    emailError: '#email-error',
    passwordError: '#pass-error',
    loginError: '[data-bind="html: message.text"]'
};

export default signInLocators;
