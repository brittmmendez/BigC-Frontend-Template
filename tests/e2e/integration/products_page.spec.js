describe('Products Page', () => {
  it('loads products with names', () => {
    cy.visit('/products-page');
    cy.wait(2000);
    cy.get('img');
  });

  it('loads products with prices', () => {
    cy.contains('$');
  });
  
  it('links to product show page', () => {
    cy.get('img')
    .first('img')
    .click({ force: true });
    cy.get('.button').contains('ADD TO BAG')
  });
});
