module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'next/core-web-vitals',
    ],
    rules: {
      'react/no-unescaped-entities': 0,
      'no-console': 0,
      'react/prop-types': 0,
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'import/prefer-default-export': 0,
      '@next/next/no-img-element': 'off',
    },
  };
  