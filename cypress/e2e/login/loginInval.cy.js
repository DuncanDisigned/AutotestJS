import { faker } from '@faker-js/faker';

describe('Login', () => {
  
  it('Вход с невалидными данными.', () => {
    cy.visit('/');

    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password(10);

    cy.log("Ввод почты");
    cy.get('input[id="email"]')
      .type(randomEmail);
    
    cy.log("Ввод пароля");
    cy.get('input[id="password"]')
      .type(randomPassword);
    
    cy.log("Отметка чекбокса");
    cy.get('input[id="remember-me"]')
      .click();

    cy.log('Нажатие на кнопку "Войти"');
    cy.get('button[data-test-id="submit_button"]')
      .click();

    // Проверяем, что отображается предупреждение об ошибке
    cy.get('p.text-sm.text-red-700', { timeout: 5000 })  
    .should('be.visible')
  });

});