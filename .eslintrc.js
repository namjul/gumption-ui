module.exports = {
  root: true,
  env: { browser: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./packages/*/tsconfig.json', './playground/tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    // Using a type system makes it safe enough to disable the checks below
    'react/jsx-props-no-spreading': 'off',

    // Custom preferences
    'import/prefer-default-export': 'off',

    // adjustments for ts extension rules
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],

    'no-underscore-dangle': ['error', { allow: ['_css'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
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
