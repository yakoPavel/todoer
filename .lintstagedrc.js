module.exports = {
  "**/*.+(js|jsx|ts|tsx)": (filenames) => [
    `eslint ${filenames.join(" ")} --fix`,
    `npm t -- --watchAll=false --findRelatedTests ${filenames.join(" ")}`,
  ],
};
