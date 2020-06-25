// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

Cypress.Commands.add('login', () => {
    const mockedBody = JSON.parse(
        '{"operationName":"login","variables":{"username":"demo@demo.com","password":"demo"},"query":"mutation login($username: String!, $password: String!) {\\n  tokenAuth(username: $username, password: $password) {\\n    token\\n    __typename\\n  }\\n}\\n"}'
    );

    cy.request({
        method: 'POST',
        url: 'https://eddy-automl-backend.k.eddy-analytics.org/api/graphql',
        body: mockedBody
    }).then(resp => {
        window.localStorage.setItem('eddy-automl-ui-token', resp.body.data.tokenAuth.token);
    });
});

// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
