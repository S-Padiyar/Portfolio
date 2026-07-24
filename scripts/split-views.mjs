import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
import * as t from "@babel/types";

const traverse = traverseModule.default;
const generate = generateModule.default;
const appPath = path.resolve("src/App.jsx");
const viewsDir = path.resolve("src/views");
const ast = parser.parse(fs.readFileSync(appPath, "utf8"), { sourceType: "module", plugins: ["jsx"] });
const app = ast.program.body.find((node) => t.isExportDefaultDeclaration(node)).declaration;
const returned = app.body.body.find((node) => t.isReturnStatement(node));
const generated = [];
let nextId = 100;
const print = (node) => generate(node, { compact: false }).code;
const lines = (node) => print(node).split("\n").length;

function freeReferences(expression, childNames) {
  const names = new Set();
  const fn = t.functionDeclaration(t.identifier("Temp"), [], t.blockStatement([t.returnStatement(expression)]));
  traverse(t.file(t.program([fn])), {
    ReferencedIdentifier(path) {
      const name = path.node.name;
      if (!childNames.has(name) && !path.scope.hasBinding(name)) names.add(name);
    },
  });
  return [...names].sort();
}

function componentFile(name, expression) {
  const childNames = new Set();
  traverse(t.file(t.program([t.expressionStatement(expression)])), {
    JSXIdentifier(path) {
      if (/^PortfolioSection\d+$/.test(path.node.name) &&
          (path.parentPath.isJSXOpeningElement() || path.parentPath.isJSXClosingElement())) {
        childNames.add(path.node.name);
      }
    },
  });
  const props = freeReferences(expression, childNames);
  const param = t.objectPattern(props.map((prop) => t.objectProperty(t.identifier(prop), t.identifier(prop), false, true)));
  const fn = t.functionDeclaration(t.identifier(name), [param], t.blockStatement([t.returnStatement(expression)]));
  const imports = [...childNames].map((child) => t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(child))], t.stringLiteral(`./${child}`),
  ));
  const file = t.file(t.program([...imports, fn, t.exportDefaultDeclaration(t.identifier(name))]));
  fs.mkdirSync(viewsDir, { recursive: true });
  fs.writeFileSync(path.join(viewsDir, `${name}.jsx`), `${print(file)}\n`);
  return props;
}

while (lines(returned.argument) > 225) {
  const choices = [];
  traverse(ast, {
    JSXElement(path) {
      if (path.node === returned.argument || !path.findParent((parent) => parent.node === returned)) return;
      const size = lines(path.node);
      if (size >= 20 && size <= 220) choices.push({ path, size });
    },
  });
  if (!choices.length) throw new Error(`Unable to split remaining ${lines(returned.argument)}-line view`);
  choices.sort((a, b) => b.size - a.size);
  const selected = choices[0];
  const name = `PortfolioSection${nextId++}`;
  const props = componentFile(name, t.cloneNode(selected.path.node, true));
  selected.path.replaceWith(t.jsxElement(
    t.jsxOpeningElement(t.jsxIdentifier(name), props.map((prop) =>
      t.jsxAttribute(t.jsxIdentifier(prop), t.jsxExpressionContainer(t.identifier(prop))),
    ), true),
    null,
    [],
    true,
  ));
  generated.push(name);
}

for (const name of generated) {
  ast.program.body.unshift(t.importDeclaration(
    [t.importDefaultSpecifier(t.identifier(name))], t.stringLiteral(`./views/${name}`),
  ));
}
fs.writeFileSync(appPath, `${print(ast)}\n`);
