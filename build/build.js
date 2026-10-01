const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const srcDir = path.join(rootDir, "src");
const outputFile = path.join(rootDir, "nytrina.user.js");

const orderedFiles = [
  "data/constants.js",
  "data/animals.js",
  "data/troops.js",
  "core/utils.js",
  "core/server.js",
  "core/storage.js",
  "parser/mapParser.js",
  "parser/oasisParser.js",
  "parser/reportParser.js",
  "core/ranking.js",
  "core/economy.js",
  "core/battleAdvisor.js",
  "core/battleLearning.js",
  "core/scanner.js",
  "ui/tabs.js",
  "ui/modal.js",
  "ui/overlay.js",
  "main.js",
];

const cssPath = path.join(srcDir, "ui", "styles.css");
const cssContent = fs.readFileSync(cssPath, "utf8");
const mainPath = path.join(srcDir, "main.js");
const mainContent = fs.readFileSync(mainPath, "utf8");
const metadataMatch = mainContent.match(
  /^\/\/ ==UserScript==[\s\S]*?^\/\/ ==\/UserScript==/m,
);

if (!metadataMatch) {
  throw new Error("Tampermonkey metadata block not found in src/main.js");
}

const prelude = [
  "(function attachStylesNamespace(global) {",
  "  'use strict';",
  "  const root = (global.NytrinA = global.NytrinA || {});",
  "  root.UI_STYLES = " + JSON.stringify(cssContent) + ";",
  "})(window);",
  "",
].join("\n");

const chunks = [prelude];

for (const relativeFile of orderedFiles) {
  const absolutePath = path.join(srcDir, relativeFile);
  const source = fs.readFileSync(absolutePath, "utf8");
  const content = relativeFile === "main.js"
    ? source.replace(metadataMatch[0], "").trimStart()
    : source;

  chunks.push("\n// FILE: " + relativeFile + "\n");
  chunks.push(content);
  chunks.push("\n");
}

// GERA O ARQUIVO FINAL
const output = metadataMatch[0] + "\n\n" + chunks.join("\n");

fs.writeFileSync(outputFile, output, "utf8");

console.log("");
console.log("======================================");
console.log("✅ Build gerado com sucesso!");
console.log(outputFile);
console.log("======================================");
