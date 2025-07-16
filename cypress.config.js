const { defineConfig } = require("cypress");
const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        readExcelFromFixture({ filename, sheetName }) {
          const filePath = path.join(__dirname, 'cypress', 'fixtures', filename);

          if (!fs.existsSync(filePath)) {
            throw new Error(`Arquivo não encontrado: ${filePath}`);
          }

          const workbook = XLSX.readFile(filePath);
          const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(sheet, { defval: '' });
          return json;
        }
      });
    },
  },
});
