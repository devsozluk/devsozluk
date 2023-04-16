const path = require("path");

module.exports = {
  stories: [
    "../stories/*.stories.mdx",
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-postcss",
      options: {
        cssLoaderOptions: {
          importLoaders: 1,
        },
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
      },
    },
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-vite",
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return {
      ...config,
      resolve: {
        alias: [
          {
            find: "@devsozluk/ui",
            replacement: path.resolve(__dirname, "../../../packages/ui"),
          },
        ],
      },
    };
  },
};
