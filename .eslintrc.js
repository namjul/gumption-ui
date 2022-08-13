module.exports = {
  root: true,
  env: { browser: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ['!.*'],
  extends: [
    'airbnb-typescript',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking', // TODO fix eslint erros
    'airbnb/hooks',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    // Using a type system makes it safe enough to disable the checks below
    'react/jsx-props-no-spreading': 'off',

    // Custom preferences
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',

    // adjustments for ts extension rules
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],

    'no-underscore-dangle': ['error', { allow: ['_css'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': 'off',
    // '@typescript-eslint/no-unnecessary-condition': ['error'], // TODO fix eslint erros
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
  },
  overrides: [
    {
      files: '**/*.test.ts',
      env: {
        jest: true,
      },
    },
  ],
};
