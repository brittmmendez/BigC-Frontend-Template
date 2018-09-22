describe('My Cart Page', () => {

    it('shows products in cart', () => {
      cy.visit('/products-page');
      cy.wait(2000);
      cy.viewport('macbook-15');
      cy.get('img').first('img').click();
      cy.get('.button').contains('ADD TO BAG').click()
      cy.get('.navbar-menu').contains('My Cart (1)').click()
      cy.contains('Total')
    });

    it('can increase product in cart', () => {
      cy.viewport('macbook-15');
      cy.get('button').get('.fa-plus').click()
      cy.contains('My Cart (2)');
    });

    it('can decrease product in cart', () => {
      cy.viewport('macbook-15');
      cy.get('button').get('.fa-minus').click()
      cy.contains('My Cart (1)');
    });

    it('can decrease product in cart', () => {
      cy.viewport('macbook-15');
      cy.get('button').get('.fa-trash-alt').click()
      cy.contains('My Cart (0)');
    });

    
  }); 


  