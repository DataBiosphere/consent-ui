module.exports = {
  rootDir: process.cwd(),
  verbose: true,
  //rootDir: './',
  projects: [ '<rootDir>/jest_project_ui.js', '<rootDir>/jest_project_api.js' ],
  preset: "jest-puppeteer",
  reporters: [ "default", "jest-junit" ],
};
