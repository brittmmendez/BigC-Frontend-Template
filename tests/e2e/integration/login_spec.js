describe('Login Page', () => {
    it('reuires all fields be filled out', () => {
      cy.visit('/login');
      cy.wait(2000);
      cy.get('form').get('.button').contains('Login').click()
      cy.get('form').get('.help')
    });
  });
  

