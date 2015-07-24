import express = require('express');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import errorhandler = require('errorhandler');
import methodOverride = require('method-override');
import morgan = require('morgan');
import routes = require('./routes/index');
import user = require('./routes/user');
import fs = require('fs');
import http = require('http');
import path = require('path');
import pr = require('promise-ring');
import mongoose = require('mongoose');
import passport = require('passport');
import boatAuth = require('passport-boat');
import authUser = require('model/user');

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

var boatAuthKey = pr.call<string>(fs.readFile, path.join(__dirname, 'boatauth.pem'), 'utf-8');

var boatAuthStrat = boatAuthKey.then(key => {
    passport.use(new boatAuth.BoatAuthStrategy({ secretOrKey: key },
        (jwt, done) => {
            (<MongooseFindOrCreatable>(<any>authUser)).findOrCreate({ username: jwt.sub },(err, user, created) => {
                if (err) {
                    done(err);
                } else {
                    // TODO: Could use something like: user.token = jwt.token;
                    done(null, user);
                }
            });
        }));

    app.use(passport.initialize());
});

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

boatAuthStrat.then(() => {
    http.createServer(app).listen(app.get('port'), () => console.log('Express server listening on port ' + app.get('port')));
});
