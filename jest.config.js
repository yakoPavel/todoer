module.exports = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  roots: ["./src"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
};
