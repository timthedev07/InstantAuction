/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testRegex: "(/src/tests/index.(test|spec))\\.ts?$",
  moduleFileExtensions: ["ts", "js"],
  maxWorkers: 1,
  cache: true,
  cacheDirectory: ".jest-cache",
  displayName: {
    color: "cyan",
    name: "GraphQL Resolvers Tests",
  },
};
