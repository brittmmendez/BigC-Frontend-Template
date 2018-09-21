describe('Product Show Page', () => {

    it('loads Product Show Page', () => {
      cy.visit('/products-page');
      cy.wait(2000);
      cy.get('img')
        .first('img')
        .click({ force: true });
      cy.get('.content');
    });

    it('can add product to bag', () => {
      cy.viewport('macbook-15');
      cy.get('.button.is-dark')
        .click({ force: true });
      cy.contains('My Cart (1)');
    });
  }); 