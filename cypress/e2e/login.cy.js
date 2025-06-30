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

after(() => {
  // Открываем меню (просто кликаем по иконке пользователя)
  cy.get('[class="h-8 w-8 rounded-full"]').click();

  // Кликаем по кнопке "Выйти"
  cy.get('a[role="menuitem"]').contains('Выход').click();

  // Проверяем, что пользователь вышел (URL содержит '/')
  cy.url().should('include', '/');
  cy.pause();
});

 });     