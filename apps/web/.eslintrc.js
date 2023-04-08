module.exports = {
  root: true,
  extends: ["devsozluk", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
  rules: {
    "react/display-name": "off",
    "react-hooks/rules-of-hooks": "off",
    "react-hooks/exhaustive-deps": "off"
  }
};
