import fs from "node:fs";
import path from "node:path";
import parser from "@babel/parser";
import traverseModule from "@babel/traverse";
import generateModule from "@babel/generator";
import * as t from "@babel/types";

const traverse = traverseModule.default;
const generate = generateModule.default;
const appPath = path.resolve("src/App.jsx");
const ast = parser.parse(fs.readFileSync(appPath, "utf8"), { sourceType: "module", plugins: ["jsx"] });
const app = ast.program.body.find((node) => t.isExportDefaultDeclaration(node)).declaration;
const selected = app.body.body.filter((node) => node.loc?.start.line >= 109 && node.loc?.end.line <= 330);
const selectedSet = new Set(selected);
const knownGlobals = new Set(["window", "document", "performance", "Math", "setTimeout", "requestAnimationFrame", "cancelAnimationFrame"]);
const hookNames = new Set(["useEffect", "useRef", "useState"]);
const wrapper = t.functionDeclaration(t.identifier("useCompanionSystem"), [], t.blockStatement(selected.map((node) => t.cloneNode(node, true))));
const wrapperFile = t.file(t.program([wrapper]));
const external = new Set();
traverse(wrapperFile, {
  ReferencedIdentifier(p) {
    const name = p.node.name;
    if (!p.scope.hasBinding(name) && !knownGlobals.has(name) && !hookNames.has(name)) external.add(name);
  },
});

let appPathRef;
traverse(ast, { FunctionDeclaration(p) { if (p.node === app) appPathRef = p; } });
const returned = new Set();
for (const statement of selected) {
  const ids = t.getBindingIdentifiers(statement);
  for (const name of Object.keys(ids)) {
    const binding = appPathRef.scope.getBinding(name);
    if (binding?.referencePaths.some((ref) => !selectedSet.has(ref.getStatementParent()?.node))) returned.add(name);
  }
}
wrapper.params = [t.objectPattern([...external].sort().map((name) => t.objectProperty(t.identifier(name), t.identifier(name), false, true)))];
wrapper.body.body.push(t.returnStatement(t.objectExpression([...returned].sort().map((name) => t.objectProperty(t.identifier(name), t.identifier(name), false, true)))));
const hookFile = t.file(t.program([
  t.importDeclaration([
    t.importSpecifier(t.identifier("useEffect"), t.identifier("useEffect")),
    t.importSpecifier(t.identifier("useRef"), t.identifier("useRef")),
    t.importSpecifier(t.identifier("useState"), t.identifier("useState")),
  ], t.stringLiteral("react")),
  t.exportDefaultDeclaration(wrapper),
]));
fs.writeFileSync(path.resolve("src/hooks/useCompanionSystem.js"), `${generate(hookFile, { compact: false }).code}\n`);

const firstIndex = app.body.body.indexOf(selected[0]);
app.body.body = app.body.body.filter((node) => !selectedSet.has(node));
const call = t.callExpression(t.identifier("useCompanionSystem"), [t.objectExpression([...external].sort().map((name) => t.objectProperty(t.identifier(name), t.identifier(name), false, true)))]);
const declaration = t.variableDeclaration("const", [t.variableDeclarator(t.objectPattern([...returned].sort().map((name) => t.objectProperty(t.identifier(name), t.identifier(name), false, true))), call)]);
app.body.body.splice(firstIndex, 0, declaration);
ast.program.body.unshift(t.importDeclaration([t.importDefaultSpecifier(t.identifier("useCompanionSystem"))], t.stringLiteral("./hooks/useCompanionSystem")));
fs.writeFileSync(appPath, `${generate(ast, { compact: false }).code}\n`);
