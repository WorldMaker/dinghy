import express = require('express');
import bodyParser = require('body-parser');
import errorhandler = require('errorhandler');
import methodOverride = require('method-override');
import morgan = require('morgan');
import routes = require('./routes/index');
import user = require('./routes/user');
import http = require('http');
import path = require('path');

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

app.use(morgan('dev'));
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(errorhandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
