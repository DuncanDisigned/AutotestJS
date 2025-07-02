import { LoginPage } from '../../support/pages/LoginPage';
import { InvalidLoginPage } from '../../support/pages/InvalidLoginPage';
import { faker } from '@faker-js/faker';

describe('Login Page', () => {
  describe('Авторизация с валидными данными', () => {
    const loginPage = new LoginPage();

    beforeEach(() => {
      cy.fixture('dataLog').as('creds');
    });

    it('Успешный логин', function () {
      loginPage.login(this.creds.email, this.creds.password);
      loginPage.assertLoginSuccess();
    });
  });

  describe('Авторизация с невалидными данными', () => {
    const invalidLoginPage = new InvalidLoginPage();

    it('Появление алёрта', () => {
      const email = faker.internet.email();
      const password = faker.internet.password();

      invalidLoginPage.loginWithInvalidCreds(email, password);
    });
  });
});