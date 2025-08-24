import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    // Cypress bu config dosyasını e2e klasöründen çalıştırır:
    // o yüzden yollar 'src/...' ile başlamalı
    specPattern: 'src/e2e/**/*.cy.{ts,tsx,js,jsx}',
    supportFile: 'src/support/e2e.ts',
    fixturesFolder: 'src/fixtures', 
    video: false,
  },
});
