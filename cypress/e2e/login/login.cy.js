import { LoginPage } from '../../support/pages/LoginPage';
import { InvalidLoginPage } from '../../support/pages/InvalidLoginPage';
import { Categories } from '../../support/pages/Categories';

import {
  generateEmail,
  generatePassword,
  generateSortNumber,
  generateCategoriesTitle,
  generateArticleTitle,
  generateFullName,
} from '../../support/testData';

describe('Мои тесты', () => {

  // Общий beforeEach для всех тестов, сбрасываем состояние и грузим fixture
  beforeEach(function () {
    cy.resetAppState();
    cy.fixture('dataLog').as('creds');
  });

  describe('Авторизация', () => {

    describe('Авторизация с валидными данными', () => {
      let loginPage;

      beforeEach(() => {
        loginPage = new LoginPage();
      });

      it('Успешный логин', function () {
        loginPage.login(this.creds.email, this.creds.password);
        loginPage.assertLoginSuccess();
      });
    });

    describe('Авторизация с невалидными данными', () => {
      let invalidLoginPage;

      before(() => {
        // Очистить куки/локалсторедж чтобы быть точно неавторизованным
        cy.clearCookies();
        cy.clearLocalStorage();
      });

      beforeEach(() => {
        invalidLoginPage = new InvalidLoginPage();
      });

      it('Появление алёрта', () => {
        const email = generateEmail();
        const password = generatePassword();

        invalidLoginPage.loginWithInvalidCreds(email, password);
      });
    });

  });

  describe('Категории', () => {
    let categories;
    let loginPage;

    beforeEach(function () {
      categories = new Categories();
      loginPage = new LoginPage();

      // Логинимся перед каждым тестом с категориями
      loginPage.login(this.creds.email, this.creds.password);
      loginPage.assertLoginSuccess();
    });

    it('Создание категории с заполнением всех полей и модального окна', () => {
      const sortValue = generateSortNumber();
      const parentCategory = 'Основная категория';
      const articles = [generateArticleTitle()];

      const modalValues = {
        'Пользователи': [generateFullName()],
        'Команды': ['Команда А'],
        'Другое': ['Значение X']
      };

      const categoryName = generateCategoriesTitle();

      categories.visit();

      categories.clickButton();

      categories.enterCategoryName(categoryName);
      categories.setStatus(true);
      categories.enterSort(sortValue);
      // categories.selectParentCategory(parentCategory);

      categories.clickAssignButton();

      categories.selectValuesInModalTabs(modalValues);

      categories.saveModal();

      categories.selectArticles(articles);

      categories.clickSaveAndExit();
      categories.assertCategoryExists(testData.categoriesName);

      cy.log('Создана категория: ' + categoryName);

      cy.contains(categoryName).should('exist');
    });
  });
});
