describe('Recipe Finder - Home', () => {
  it('loads the homepage and categories are visible', () => {
    cy.visit('/');
    cy.contains('Recipe Finder').should('be.visible');
    cy.get('[data-cy=categories]', { timeout: 10000 }).should('exist');
  });
});

describe('Recipe Finder - Category Flow', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/categories*', { fixture: 'categories.json' }).as(
      'getCategories'
    );
    cy.intercept('GET', '**/filter*', {
      fixture: 'recipes-by-category.json',
    }).as('getByCategory');

    cy.visit('/');
    cy.wait('@getCategories');
  });

  it('selects a category and shows recipes', () => {
    cy.get('[data-cy=category-checkbox]').first().click({ force: true });
    cy.wait('@getByCategory');

    cy.get('[data-cy=recipe-card]').should('have.length.at.least', 1);
  });

  it('opens recipe details when a recipe card is clicked', () => {
    cy.intercept('GET', '**/lookup.php*', { fixture: 'recipe-detail.json' }).as(
      'getDetail'
    );
    cy.get('[data-cy=category-checkbox]').first().click({ force: true });
    cy.wait('@getByCategory');

    cy.get('[data-cy=view-more]').first().click();
    cy.wait('@getDetail');

    cy.get('.mat-mdc-dialog-container, .mat-dialog-container').should(
      'be.visible'
    );
    cy.get('[data-cy=dialog-title]').should('be.visible');
    cy.get('[data-cy=dialog-ingredients]').should('be.visible');
    cy.get('[data-cy=dialog-instructions]').should('be.visible');

    cy.get('[data-cy=dialog-close]').click();
    cy.get('.mat-dialog-container').should('not.exist');
  });
});
