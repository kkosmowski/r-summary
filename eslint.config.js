import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import noRelativeImportPaths from 'eslint-plugin-no-relative-import-paths';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, 'plugin:prettier/recommended'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'no-relative-import-paths': noRelativeImportPaths,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],
      'no-relative-import-paths/no-relative-import-paths': ['error', { allowSameFolder: true, rootDir: 'src/' }],
      '@typescript-eslint/no-shadow': 'error',
      'import/order': [
        'error',
        {
          groups: [
            ['external', 'builtin'],
            ['parent', 'internal'],
            ['index', 'sibling'],
          ],
          'newlines-between': 'always',
        },
      ],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'import/no-cycle': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': [
        'error',
        {
          ignoreConditionalTests: true,
        },
      ],
    },
  },
);
