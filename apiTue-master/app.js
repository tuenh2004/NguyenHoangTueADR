var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/userRouter');
var usersRouter = require('./Model/user');
var homeRouter = require('./routes/homeRouter');
var serviceRouter = require('./routes/serviceRouter');
var newsRouter = require('./routes/newsRouter');
var photosRouter = require('./routes/PhotoPrinting');
const scheduleRoutes = require('./routes/scheduleRoutes');

var app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://honest:honest2004@cluster0.1qd1t45.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
db.once('open', function () {
  console.log('Đã kết nối thành công đến MongoDB!');
});





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', homeRouter);
app.use('/', serviceRouter);
app.use('/', newsRouter);
app.use('/', photosRouter);
app.use('/', scheduleRoutes);
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

module.exports = app;
