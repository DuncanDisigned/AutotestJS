export class InvalidLoginPage {
  visit() {
    cy.visit('/');
  }

  fillEmail(email) {
    cy.log("Ввод почты");
    cy.get('input[id="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.log("Ввод пароля");
    cy.get('input[id="password"]').clear().type(password);
  }

  checkRememberMe() {
    cy.log("Отметка чекбокса");
    cy.get('input[id="remember-me"]').check({ force: true });
  }

  submit() {
    cy.log('Нажатие на кнопку "Войти"');
    cy.get('button[data-test-id="submit_button"]').click();
  }

  assertLoginErrorVisible() {
    cy.log("Проверка отображения ошибки");
    cy.get('p.text-sm.text-red-700', { timeout: 5000 }).should('be.visible');
  }

  loginWithInvalidCreds(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.checkRememberMe();
    this.submit();
    this.assertLoginErrorVisible();
  }
}