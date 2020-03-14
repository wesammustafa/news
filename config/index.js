const development = require('./development');
const test = require('./test');

const environment = process.env.NODE_ENV || 'development';
const config = {
  development,
  test,
};

module.exports = config[environment];
