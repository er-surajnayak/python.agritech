import path from "node:path";
import { copyFileSync, mkdirSync } from "node:fs";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const pyodideRuntimeAssets = [
  "pyodide-lock.json",
  "pyodide.mjs",
  "pyodide.asm.mjs",
  "pyodide.asm.wasm",
  "python_stdlib.zip",
];

function copyPyodideRuntime() {
  return {
    name: "copy-pyodide-runtime",
    closeBundle() {
      const sourceDirectory = path.resolve(import.meta.dirname, "node_modules/pyodide");
      const outputDirectory = path.resolve(import.meta.dirname, "dist/pyodide");
      mkdirSync(outputDirectory, { recursive: true });
      pyodideRuntimeAssets.forEach((asset) => {
        copyFileSync(path.join(sourceDirectory, asset), path.join(outputDirectory, asset));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), copyPyodideRuntime()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(import.meta.dirname, ".") },
      {
        find: /^~@ibm\/plex/,
        replacement: path.resolve(import.meta.dirname, "node_modules/@ibm/plex"),
      },
    ],
  },
  build: {
    target: "es2022",
    sourcemap: true,
  },
});
