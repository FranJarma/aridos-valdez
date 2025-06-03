import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import tseslint from "typescript-eslint";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import unusedImports from "eslint-plugin-unused-imports";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier,
      react: eslintPluginReact,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "sort-destructure-keys": sortDestructureKeys,
      "typescript-sort-keys": typescriptSortKeys,
      "unused-imports": unusedImports,
      import: eslintPluginImport,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "prettier/prettier": "error",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: "last",
          reservedFirst: true,
          ignoreCase: true,
        },
      ],

      "import/order": [
        "warn",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "@assets/**", group: "internal", position: "after" },
            { pattern: "@components/**", group: "internal", position: "after" },
            { pattern: "@constants/**", group: "internal", position: "after" },
            { pattern: "@features/**", group: "internal", position: "after" },
            { pattern: "@hooks/**", group: "internal", position: "after" },
            { pattern: "@routes/**", group: "internal", position: "after" },
            { pattern: "@types/**", group: "internal", position: "after" },
            { pattern: "@utils/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],

      "sort-destructure-keys/sort-destructure-keys": "warn",
      "typescript-sort-keys/interface": "warn",
      "typescript-sort-keys/string-enum": "warn",
      "unused-imports/no-unused-imports": "warn",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
