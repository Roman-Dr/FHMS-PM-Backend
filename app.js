var express = require('express');
var cors = require('cors');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


// IMPORT MODELS
require('./server/models/user');
require('./server/models/project');
require('./server/models/backlogItem');
require('./server/models/sprint');
require('./server/models/planningPoker');
// END IMPORT MODELS

//var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var projects = require('./server/routes/projects');
var userstories = require('./server/routes/userstories');
var databaseInitializer = require('./server/routes/databaseInitializer');
var backlogItems = require('./server/routes/backlogItems');
var sprints = require('./server/routes/sprints');
var planningPoker = require('./server/routes/planningPoker');


var session = require('express-session');
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
app.use(cookieParser('topsecret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//required for passport
app.use(session({
    secret: 'topsecret', // Server side secret to encrypt the passwords
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Register routes with modules
//app.use('/', routes);

//
// REGISTER API MODULES
//
app.use('/api', users);
app.use('/api', userstories);
app.use('/api', projects);
app.use('/api', backlogItems);
app.use('/api', sprints);
app.use('/api', planningPoker);
app.use('/system', databaseInitializer);
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
