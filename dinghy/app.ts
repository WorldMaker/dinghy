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
import passport = require('passport');
import boatAuth = require('./passport-boat');
import authUser from './model/user'
import { connect } from 'camo'

// connect to Mongo
connect('mongodb://localhost/test').then(db => db.on('error', console.error.bind(console, 'connection error:'))) // TODO: Something smarter than this?

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
            authUser.loadOneAndUpdate({ username: jwt.sub }, { upsert: true })
                .then(user => done(null, user), err => done(err))
        }))

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
