const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require("./config");
const mongoose = require("mongoose");

//Load Routers
const indexRouter = require('./routes/index');
const itemRouter = require('./routes/item');

// connect to database
const db = config.mongoURI;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err){
    console.log('Could not connect to MongoDB');
    return;
  }
});

//Express App
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Assign Routers
app.use('/', indexRouter);
app.use('/item', itemRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const port = config.port;
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

module.exports = app;
