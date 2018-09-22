describe('Registration Page', () => {
    it('reuires all fields be filled out', () => {
      cy.visit('/register');
      cy.wait(2000);
      cy.get('form').get('.button').contains('Register').click()
      cy.get('form').get('.help')
    });
  });
  

