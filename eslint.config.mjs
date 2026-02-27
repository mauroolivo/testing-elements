import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  // allow namespaces in declaration files for type augmentations
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: true }],
    },
  },
  // Add jsx-a11y plugin and recommended rules. Register under a local key
  // to avoid collisions with other configs that may already register the
  // same plugin name.
  {
    plugins: { 'jsx-a11y-local': jsxA11y },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: Object.fromEntries(
      Object.entries(
        (jsxA11y &&
          jsxA11y.configs &&
          jsxA11y.configs.recommended &&
          jsxA11y.configs.recommended.rules) ||
          {}
      ).map(([id, cfg]) => [id.replace(/^jsx-a11y\//, 'jsx-a11y-local/'), cfg])
    ),
  },
  prettier,
]);

export default eslintConfig;
