const development = require('./development');

const environment = process.env.NODE_ENV || 'development';
const config = {
  development,
};

module.exports = config[environment];
