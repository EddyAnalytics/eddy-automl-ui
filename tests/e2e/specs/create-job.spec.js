describe('Create a new AutoML Job', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Visits the app root url', () => {
        cy.visit('/');
        cy.contains('h1', 'AutoML');
    });

    it('Shoud be redirected to Jobs', () => {
        cy.url().should('include', '/jobs');
    });

    it('Creates new Job', () => {
        const addNewBtn = cy.get('body > div > main > section > div > article').last();
        addNewBtn.should('contain', 'Add new');
        addNewBtn.click();
        cy.url().should('include', '/jobs/new');
        cy.get('form').should('exist');

        cy.get('input[type=text]')
            .first()
            .type('Test job');
        cy.get('input[type=number]').type('6');
        cy.get('form').submit();

        // Check if the last job from the list has the provided name
        cy.get('body > div > main > section > div > article')
            .last()
            .prev()
            .should('contain', 'Test job');
    });
});
