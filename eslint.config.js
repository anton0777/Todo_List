import js from '@eslint/js';
import json from "@eslint/json";
import globals from 'globals';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default defineConfig( [
  globalIgnores(['dist']),
  {
    ignores: [
      'node_modules',
      'server/generated',
    ],
  },
  // Base ESLint recommended rules
  js.configs.recommended,
  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // prettier,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,

  // Custom configurations (for globals)
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  // JSON
  {
    files: ["**/*.json"],
    language: "json/json",
    ...json.configs.recommended,
    rules: {
      "no-irregular-whitespace": "off",
    }
  },
  // JSON with comments
  {
    files: ['tsconfig.json'],
    language: 'json/jsonc',
    ...json.configs.recommended,
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['client/**/*.ts', 'client/**/*.tsx', 'client/**/*.js', 'client/**/*.jsx'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
  },
]);
