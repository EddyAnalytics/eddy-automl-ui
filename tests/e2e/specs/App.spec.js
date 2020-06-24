describe('App renders', () => {
    it('Visits the app root url', () => {
        cy.visit('/');
        cy.contains('h1', 'AutoML');
    });
});
