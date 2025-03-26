var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var express = require('express');
const cors = require("cors")
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();
// Cấu hình CORS
app.use(cors()); // Mở CORS cho tất cả các domain

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', require('./routes/categories'));
app.use('/products', require('./routes/products'));
app.use('/producers', require('./routes/producers'));


// connect to database mongodb
mongoose.connect("mongodb://localhost:27017/DoAn_Nodejs");
mongoose.connection.on('connected',function(){
  console.log("connected hehehe");
})


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
  res.send('error');
});

const port = 5000
const host = "127.0.0.1"
app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}`)
})

module.exports = app;
