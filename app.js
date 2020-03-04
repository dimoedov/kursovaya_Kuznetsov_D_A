let express = require('express');
let path = require('path');
let session = require("express-session");
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
let passport = require('passport');
let cors = require('cors');
let config = require('./config/database');

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

let api = require('./routes/api');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());

// uncomment after placing your favicon in /public
app.use(logger('dev'));
// app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({ secret: 'cats' }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.engine('ejs', require('ejs-locals'));
// app.use(express.logger());
// app.use(express.cookieParser());
// app.use(express.bodyParser());
// app.use(express.methodOverride());
// app.use(express.session({ secret: 'keyboard cat' }));
// app.use(flash());
// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(app.router);
// app.use(express.static(__dirname + '/../../public'));

app.get('/', function(req, res) {
  res.send('Page under construction.');
});

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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
if (process.platform === "win32") {
  let rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
  //graceful shutdown
  console.log('godby');
  process.exit();
});
module.exports = app;
