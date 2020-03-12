const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
require('dotenv').config();
const config = require('./config');

const app = express();
// connect to db
require('./dbConnection')();

// parse application/json
app.use(bodyParser.json());

// register routes
app.use('/api', require('./api'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.APP.Port, () => {
  console.log(config.CHALK.success(`News server is up and running on port: ${config.APP.Port}`));
});
