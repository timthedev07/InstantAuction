const path = require("path");
const monorepoPackages = ["client-controllers"];
const paths = monorepoPackages.map((each) => ({
  name: each,
  path: path.resolve(__dirname, `../${each}`),
}));

/** @type {import('next').NextConfig} */
module.exports = () => {
  return {
    webpack(config, { defaultLoaders }) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: monorepoPackages.map((each) =>
          path.resolve(__dirname, `../${each}`)
        ),
        use: [defaultLoaders.babel],
      });

      paths.forEach((module) => {
        config.resolve.alias[module.name] = module.path;
      });
      return config;
    },
  };
};
