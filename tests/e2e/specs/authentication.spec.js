describe('Authenticates in the application', () => {
    it('Visits the app root url', () => {
        cy.visit('/');
        cy.contains('h1', 'AutoML');
    });

    it('Login form exists', () => {
        cy.get('.box').should('exist');
        cy.get('.box').contains('h2', 'Log in with email and password');
        cy.get('.box form').should('exist');
    });

    it('Login using the UI fields', () => {
        cy.get('input[type=email]').type('demo@demo.com');
        // {enter} causes the form to submit
        cy.get('input[type=password]').type('demo{enter}');
        // we should be redirected to /jobs
        cy.url().should('include', '/jobs');
    });

    it('Check the jobs list', () => {
        cy.contains('.title', 'Jobs');
        cy.get('body > div > main > section > div > article').should(jobsList => {
            expect(jobsList.length).to.be.greaterThan(1);
        });
    });

    it('Check the Add new button', () => {
        cy.get('body > div > main > section > div > article')
            .last()
            .should('contain', 'Add new');
    });
});
