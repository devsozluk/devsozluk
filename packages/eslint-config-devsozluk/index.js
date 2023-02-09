module.exports = {
    extends: ["next", "turbo", "prettier"],
    rules: {
      "react/display-name": [2, { "ignoreTranspilerName": true }],
      "@next/next/no-html-link-for-pages": "off",
      "react/jsx-key": "off",
    },
  };