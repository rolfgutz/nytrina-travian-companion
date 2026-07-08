const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const outputFile = path.join(rootDir, 'nytrina.user.js');

const orderedFiles = [
  'data/constants.js',
  'data/animals.js',
  'data/servers.js',
  'data/troops.js',
  'core/utils.js',
  'core/server.js',
  'core/storage.js',
  'parser/mapParser.js',
  'parser/oasisParser.js',
  'parser/reportParser.js',
  'core/ranking.js',
  'core/economy.js',
  'core/battleAI.js',
  'core/scanner.js',
  'ui/tabs.js',
  'ui/modal.js',
  'ui/overlay.js',
  'main.js'
];

const cssPath = path.join(srcDir, 'ui', 'styles.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

const prelude = [
  '(function attachStylesNamespace(global) {',
  "  'use strict';",
  '  const root = (global.NytrinA = global.NytrinA || {});',
  '  root.UI_STYLES = ' + JSON.stringify(cssContent) + ';',
  '})(window);',
  ''
].join('\n');

const chunks = [prelude];

for (const relativeFile of orderedFiles) {
  const absolutePath = path.join(srcDir, relativeFile);
  const content = fs.readFileSync(absolutePath, 'utf8');

  chunks.push('\n// FILE: ' + relativeFile + '\n');
  chunks.push(content);
  chunks.push('\n');
}

// GERA O ARQUIVO FINAL
const output = chunks.join('\n');

fs.writeFileSync(outputFile, output, 'utf8');

console.log('');
console.log('======================================');
console.log('✅ Build gerado com sucesso!');
console.log(outputFile);
console.log('======================================');