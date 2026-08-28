// docs: https://typescript-eslint.io/users/configs

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  // Ignored files
  globalIgnores([
    '**/dist/',
    '**/components/shadcn', // "shadcn" components
  ]),

  // Extended configs
  js.configs.recommended,
  tseslint.configs.strictTypeChecked, // Strict with "Type Information"
  tseslint.configs.stylisticTypeChecked, // Stylistic with "Type Information"
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,

  // Linting with "Type Information" + globals
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: { projectService: true },
    },
  },
  { files: ['**/*.js'], extends: [tseslint.configs.disableTypeChecked] },

  // Settings
  {
    plugins: { 'check-file': checkFile },
    rules: {
      // "eslint"
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['..', 'src'], message: 'Use path alias' },
            { group: ['index'], message: 'Avoid barrel imports' },
            { group: ['*.js', '*.ts'], message: 'Avoid extensions' },
          ],
        },
      ],

      // "eslint-plugin-check-file"
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': ['error', { '**/': 'KEBAB_CASE' }],
    },
  },

  // Prettier
  eslintConfigPrettier, // Put it last to override other configs
);
