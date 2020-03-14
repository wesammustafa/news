const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const { responses } = require('./middlewares');
require('dotenv').config({ path: `${process.env.NODE_ENV}.env` });
const config = require('./config');

const app = express();
// connect to db
require('./dbConnection')();

// parse application/json
app.use(bodyParser.json());

app.use([
  responses,
]);

// register routes
app.use('/api', require('./api'));

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // only providing error in development
  if (process.env.NODE_ENV === 'development') {
    return res.sendUnknownError(err, err.message);
  }
  return res.sendUnknownError();
});

app.listen(config.APP.Port, () => {
  console.log(config.CHALK.success(`${config.APP.Name} server is up and running on port: ${config.APP.Port}`));
});

module.exports = app;
