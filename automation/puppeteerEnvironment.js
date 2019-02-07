const chalk = require('chalk');
const NodeEnvironment = require('jest-environment-node');
const puppeteer = require('puppeteer');
const fs = require('fs');
const os = require('os');
const path = require('path');

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
const wsEndpointDir = path.join(DIR, 'wsEndpoint');

class PuppeteerEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log(chalk.green('Setup Puppeteer environment.'));
    await super.setup();
    const wsEndpoint = fs.readFileSync(wsEndpointDir, 'utf8');
    if (!wsEndpoint) {
      throw new Error('wsEndpoint not found');
    }
    this.global.__BROWSER__ = await puppeteer.connect({
      browserWSEndpoint: wsEndpoint,
    });
  }

  async teardown() {
    console.log(chalk.green('Teardown Puppeteer environment.'));
    await super.teardown();
  }

}

module.exports = PuppeteerEnvironment;
