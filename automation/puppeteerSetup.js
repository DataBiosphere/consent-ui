const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const chalk = require('chalk');

const chromeSwitchs = [ '--incognito', '--no-sandbox', '--disable-setuid-sandbox' ];

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');

module.exports = async function () {
  console.log(chalk.green('Setup Puppeteer...'));
  const browser = await puppeteer.launch({headless: false, slowMo: 2000, chromeSwitchs});
  global.__BROWSER_GLOBAL__ = browser;
  // expose connection details in file
  mkdirp.sync(DIR);
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
};
