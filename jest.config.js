module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  roots: ["./src"],
  moduleDirectories: ["node_modules", "./src"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
