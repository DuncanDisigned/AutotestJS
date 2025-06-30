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
  cy.get('div.ml-3.relative').then($el => {
    const state = $el.attr('data-headlessui-state');

    if (state !== 'open') {
      cy.log("Меню закрыто, открываем...");
      cy.wrap($el).click();
    } else {
      cy.log("Меню уже открыто, кликаем не нужно");
    }
  });

  // Ждём пока меню откроется и кнопка станет видимой
  cy.get('a[id="headlessui-menu-item-:re:"]')
    .should('be.visible')
    .click();

  cy.url().should('include', '/');
});

 });     