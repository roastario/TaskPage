var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var routes = require('./routes/index');
var users = require('./routes/users');
var secure = require('./routes/secure');
var userApi = require('./model/users');
var uuid = require('node-uuid');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    genid: function(req) {
        return uuid.v4();; // use UUIDs for session IDs
    },
    secret: 'keyboard cat'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/secure', function(req, res, next){
    console.log('secureAttempt' + req.session);
    userApi.loadUser(req.session.userId, function(user){
        if (user){
            req.user = user;
            next();
        }else{
            console.log('Failed Login: ' + req.session.userId);
            res.render('error', {
                message: 'Unauthorised',
                error: {}
            });
        }
    })

});


app.use('/', routes);
app.use('/users', users);
app.use('/secure', secure);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
