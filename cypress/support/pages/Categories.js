import { ROUTES } from '../routes';
import { testData } from '../testData';

export class Categories {
  visit() {
    cy.visit(ROUTES.categories); // или через ROUTES
  }

  clickButton() {
    cy.get('button[type="button"]')
  .contains('Добавить категорию')
  .click();
  }

  enterCategoryName(name) {
  cy.wait(2000);
  cy.get('input.shadow-sm[type="text"]')
    .eq(0)
    .should('be.enabled')       // дождаться, что поле не disabled
    .clear()
    .type(name);
}

setStatus() {
  cy.get('button[role="switch"]').then($btn => {
    const isChecked = $btn.attr('aria-checked') === 'true';
    if (!isChecked) {
      cy.wrap($btn).click();
    }
  });
}
  

  enterSort(value) {
    cy.get('input[type="number"]').clear().type(value.toString());
  }

// //   selectParentCategory(name) {
//     cy.get('input[role="combobox"]').eq(0).select(name);
//   }

clickAssignButton() {
  cy.get('button[type="button"]').contains('Выбрать').click();
}

selectValuesInModalTabs() {
  cy.get('.modal').within(() => {
    // Ждём, пока вкладки прогрузятся
    cy.get('div.cursor-pointer').eq(2).contains('Другое').click();

    // Явное ожидание появления нужного поля
    cy.get('div[class=" css-19bb58m"]').eq(2).should('be.visible').click();

    // Выбор значения из списка
    cy.contains('div', 'Все пользователи').click();
  });
}

saveModal() {
  cy.get('.modal').within(() => {
    cy.get('button.bg-indigo-600').contains('Сохранить').click();
  });
}

  selectArticles(articles) {
    cy.get('input[role="combobox"]').eq(1).select(articles);
    cy.contains('div', 'Общая информация').click();
  }

  clickSaveAndExit() {
    cy.contains('button', 'Сохранить и Закрыть').click();
  }

  assertCategoryExists(name) {
  cy.url().should('include', ROUTES.categories); // Убедиться, что мы на странице списка категорий
  cy.contains(name).should('exist'); // Проверка, что категория с нужным названием есть
}


  createCategory() {
    this.visit();
    this.enterCategoryName(testData.categoriesName);
    this.setStatus(true);
    this.enterSort(testData.sortValue);
    // родительская категория — статичная, либо можно взять из testData
    // this.selectParentCategory('Основная категория'); 
    this.clickAssignButton();
    this.selectValuesInModalTabs(modalValues);
    this.saveModal();
    this.selectArticles([testData.articleTitle]);
    this.clickSaveAndExit();
    this.assertCategoryExists(testData.categoriesName);
  }
}