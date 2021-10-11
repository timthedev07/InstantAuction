const path = require("path");
const clientControllersDirName = "client-controllers";
const paths = [
  {
    name: clientControllersDirName,
    path: path.resolve(__dirname, `../${clientControllersDirName}`),
  },
];

/** @type {import('next').NextConfig} */
module.exports = () => {
  return {
    webpack(config, { defaultLoaders }) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        include: [path.resolve(__dirname, `../${clientControllersDirName}`)],
        use: [defaultLoaders.babel],
      });

      paths.forEach((module) => {
        config.resolve.alias[module.name] = module.path;
      });
      return config;
    },
  };
};
