import { faker, Faker, ru } from '@faker-js/faker';

const fakerRu = new Faker({ locale: [ru] });

export function generateCourseName() {
  const topics = ['Cypress', 'JavaScript', 'UX-дизайн', 'SQL', 'Postman'];
  const levels = ['начинающих', 'продвинутых', 'тестировщиков'];
  const formats = ['курс', 'интенсив', 'воркшоп'];
  return `${fakerRu.helpers.arrayElement(formats)} по ${fakerRu.helpers.arrayElement(topics)} для ${fakerRu.helpers.arrayElement(levels)}`;
}

export function generateLessonTitle() {
  const verbs = ['Основы', 'Продвинутые техники', 'Практика', 'Теория', 'Лучшие практики'];
  const subjects = ['Cypress', 'тестирования', 'автоматизации', 'JavaScript', 'отладки'];
  return `${fakerRu.helpers.arrayElement(verbs)} ${fakerRu.helpers.arrayElement(subjects)}`;
}

export function generateSortNumber() {
  return fakerRu.number.int({ min: 100, max: 900 });
}

export function generateCategoriesTitle() {
  const nameCategory = ['Полное руководство', 'Пошаговое руководство','Советы и трюки'];
  const subject = ['Cypress', 'категория', 'автоматизация', 'JavaScript', 'отладки'];
  return `${fakerRu.helpers.arrayElement(nameCategory)} ${fakerRu.helpers.arrayElement(subject)}`;
}

export function generateArticleTitle() {
  const adjectives = ['Полное руководство', 'Пошаговое руководство', 'Обзор', 'Советы и трюки', 'Инсайдерская информация'];
  const topics = ['по Cypress', 'по тестированию', 'по автоматизации', 'по JavaScript', 'по качеству ПО'];
  return `${fakerRu.helpers.arrayElement(adjectives)} ${fakerRu.helpers.arrayElement(topics)}`;
}

export function generateFullName() {
  const firstName = fakerRu.person.firstName();
  const lastName = fakerRu.person.lastName();
  return `${firstName} ${lastName}`;
}

export function generatePhone() {
  return fakerRu.phone.number('+7 (9##) ###-##-##');
}

export function generatePassword() {
  return faker.internet.password();
}

export function generateEmail() {
  return faker.internet.email();
}