module.exports = {
  extends: [
    "eslint-config-sumikko",
    "eslint-config-sumikko/ts",
    "eslint-config-sumikko/react",
    "eslint-config-sumikko/prettier",
  ],
  rules: {
    "node/no-unpublished-import": [
      "error",
      {
        allowModules: ["vite", "@vitejs/plugin-react-refresh"],
      },
    ],
    "arrow-body-style": 0,
  },
};
