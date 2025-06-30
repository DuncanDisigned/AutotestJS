describe('TestLC', () => {
  beforeEach(() => {
    cy.fixture('dataLog').as('creds');
  });

  it('Вход на сайт.', function() {
    cy.visit('/');

    cy.log("Ввод почты");
    cy.get('input[id="email"]')
      .type(this.creds.email);
    
    cy.log("Ввод ппароля");
    cy.get('input[id="password"]')
      .type(this.creds.password);
    
    cy.log("Отметка чекбокса");
    cy.get('input[id="remember-me"]')
      .click();

    cy.log('Нажатие на кнопку "Войти"');
    cy.get('button[data-test-id="submit_button"]')
      .click();

    cy.log('Вход выполнен!');
    cy.url().should('include', '/cp');  
  })

  afterEach(() => {
  Cy.log("Открытие модалки пользователя")
  cy.get('div[class="ml-3 relative"]').click();

  Cy.log('Нажатие на кнопку "Выйти"')
  cy.get('a[id="headlessui-menu-item-:re:"]').click();

  
  cy.url().should('include', '/');
});
 });     