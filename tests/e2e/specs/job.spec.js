describe('Create a new AutoML Job', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Shoud be redirected to Jobs', () => {
        cy.visit('/');
        cy.url().should('include', '/jobs');
    });

    it('Opens the first Job', () => {
        cy.get('body > div > main > section > div > article')
            .first()
            .click();
    });

    it('Checks for Job title', () => {
        cy.contains('.title', 'Job');
    });

    it('Checks if all 4 metric cards are present', () => {
        cy.contains(':nth-child(1) > .box', 'Training samples');
        cy.contains(':nth-child(2) > .box', 'Accuracy');
        cy.contains(':nth-child(3) > .box', 'Kappa');
        cy.contains(':nth-child(4) > .box', 'Predictions');
    });

    it('Checks if the accuracy chart is present', () => {
        cy.get('#line-chart').should('be.visible');
        cy.get('#line-chart').should('have.class', 'chartjs-render-monitor');
    });

    it('Checks if the Sample predictions panel is present', () => {
        cy.get('.main > :nth-child(1) > :nth-child(4)');
        cy.contains('.main > :nth-child(1) > :nth-child(4)', 'Sample predictions');
    });

    it('Checks if the Job management panel is present', () => {
        cy.get('.main > :nth-child(1) > :nth-child(5)');
        cy.contains('.main > :nth-child(1) > :nth-child(5)', 'Job management');
    });

    it('Takes a screenshot of the entire page', () => {
        cy.screenshot();
    });
});
