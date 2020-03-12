const mongoose = require('mongoose');
const config = require('../config');

const dbURL = config.DATABASE.Uri;
const chalk = config.CHALK;

module.exports = () => {
  mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on('connected', () => {
    console.log(chalk.connected('Mongoose default connection is open to ', dbURL));
  });

  mongoose.connection.on('error', (err) => {
    console.log(chalk.error(`Mongoose default connection has occurred ${err} error`));
  });

  mongoose.connection.on('disconnected', () => {
    console.log(chalk.disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(chalk.termination('Mongoose default connection is disconnected due to application termination'));
      process.exit(0);
    });
  });
};
