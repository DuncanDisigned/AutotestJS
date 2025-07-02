export class LoginPage {
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

  assertLoginSuccess() {
    cy.log('Проверка, что вход выполнен');
    cy.url().should('include', '/cp');
  }

  openProfileMenu() {
    cy.log('Нажатие на иконку профиля');
    cy.get('[class="h-8 w-8 rounded-full"]', { timeout: 5000 }).click();
  }

  logout() {
    cy.log('Нажатие на кнопку "Выход"');
    cy.get('a[role="menuitem"]').contains('Выход').click();
    cy.url().should('include', '/');
    cy.log("Выход выполнен");
  }

  login(email, password) {
    this.visit();
    this.fillEmail(email);
    this.fillPassword(password);
    this.checkRememberMe();
    this.submit();
    this.assertLoginSuccess();
  }
}