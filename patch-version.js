const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, './node_modules/@angular/core/fesm2022/core.mjs');
const original = fs.readFileSync(file, 'utf8');

// Backup do arquivo original
fs.writeFileSync(path.resolve(__dirname, 'core.original.mjs'), original);

const patched = original
  .replace(
    /VERSION = new Version\(['"][^'"]+['"`]\)/,
    `VERSION = new Version('0.0.0-PLACEHOLDER')`
  )
  .replace(
    /\['ng-version',\s*['"][^'"]+['"`]\]/,
    `['ng-version', '0.0.0-PLACEHOLDER']`
  );

// Escreve o arquivo modificado
fs.writeFileSync(file, patched);

console.log('✔ Versão do Angular patchada para 0.0.0-PLACEHOLDER');
