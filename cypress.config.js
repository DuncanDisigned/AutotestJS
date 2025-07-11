const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: '68uz8h',
  e2e: {
    baseUrl: 'https://demo.org-online.ru',  
    supportFile: 'cypress/support/e2e.js',        
    specPattern: 'cypress/e2e/**/*.cy.js', 
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }  
  },
})
