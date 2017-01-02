var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var projects = require('./server/routes/projects');
var userstories = require('./server/routes/userstories');

var session      = require('express-session');
var flash = require('connect-flash');

var mongoose = require('mongoose');
var configDB = require('./server/config/database.js');
mongoose.connect(configDB.url);
var db = mongoose.connection;

var passport = require('passport');
require('./server/config/passport')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.options('*', cors());

app.use('/doc', express.static('doc'));

app.use(cors());
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({
    secret: 'topsecret', // Server side secret to encrypt the passwords
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// Register routes with modules
//app.use('/', routes);

//
// REGISTER API MODULES
//
app.use('/api', users);
app.use('/api', userstories);
app.use('/api', projects);
// END REGISTER API MODULES

require('./server/routes/authentication.js')(app, passport);


//======ERROR=======

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
db.on('error', console.error.bind(console, 'connection error:'));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
