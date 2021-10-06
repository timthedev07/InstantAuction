const path = require("path");
const paths = [{ name: "shared", path: path.resolve(__dirname, "../shared") }];

module.exports = () => {
  return {
    webpack(config, { defaultLoaders }) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, "../shared")],
        use: [defaultLoaders.babel],
      });

      paths.forEach((module) => {
        config.resolve.alias[module.name] = module.path;
      });
      return config;
    },
  };
};
