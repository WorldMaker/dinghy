import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import errorhandler = require('errorhandler');
import methodOverride = require('method-override');
import morgan = require('morgan');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');
import mongoose = require('mongoose');
import passport = require('passport');
import boatAuth = require('passport-boat');

// connect to Mongo
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // TODO: Something smarter than this?

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// TODO: npm install serve-favicon; was app.use(express.favicon());

// TODO: Determine if should use route-specific body parsing
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(morgan('dev'));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new boatAuth.BoatAuthStrategy({ secretOrKey: null },
    (jwt, done) => {
        // TODO
    }));

app.use(passport.initialize());

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
