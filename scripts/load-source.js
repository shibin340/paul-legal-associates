const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('typescript');

const sourceDir = path.resolve(__dirname, '../src');
const cache = new Map();
const compilerOptions = {
  module: ts.ModuleKind.CommonJS,
  target: ts.ScriptTarget.ES2020,
  jsx: ts.JsxEmit.ReactJSX,
  esModuleInterop: true,
  resolveJsonModule: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  baseUrl: sourceDir
};

// Load the same React components and data used by the client. This build-only
// loader resolves the existing src aliases without changing Node's global hooks.
function loadSource(filename) {
  filename = path.resolve(filename);
  if (cache.has(filename)) return cache.get(filename).exports;
  if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));

  const sourceModule = new Module(filename, module);
  sourceModule.filename = filename;
  sourceModule.paths = Module._nodeModulePaths(path.dirname(filename));
  cache.set(filename, sourceModule);
  sourceModule.require = request => {
    const resolved = ts.resolveModuleName(request, filename, compilerOptions, ts.sys).resolvedModule;
    if (resolved && resolved.resolvedFileName.startsWith(sourceDir + path.sep)) {
      return loadSource(resolved.resolvedFileName);
    }
    return Module.prototype.require.call(sourceModule, request);
  };
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions,
    fileName: filename
  }).outputText;
  sourceModule._compile(compiled, filename);
  return sourceModule.exports;
}

module.exports = { loadSource };
