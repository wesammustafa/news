const chalk = require('chalk');
const packageJson = require('../package.json');

module.exports = {
  APP: {
    Name: packageJson.name,
    Version: packageJson.version,
    Port: process.env.PORT || 3000,
    Reading: {
      Default: 15,
    },
  },
  DATABASE: {
    Uri: process.env.DB_URI,
  },
  CHALK: {
    success: chalk.bold.green,
    connected: chalk.bold.cyan,
    error: chalk.bold.yellow,
    disconnected: chalk.bold.red,
    termination: chalk.bold.magenta,
  },
};
