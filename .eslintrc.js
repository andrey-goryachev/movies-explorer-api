module.exports = {
  extends: 'airbnb-base',
  rules: {
    // это правило по заданию
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-useless-escape': 'off',
  },
};
