// var express = require('express');
// var mysql = require('mysql');
// var app = express();
// var PORT = 8085;

// app.get('/', function(req, res) {
//     res.status(200).send({ data: 'Hello' });
// });

// app.listen(PORT, function() {
//     console.log('Server is running on PORT:',PORT);
// });

// app.use((req, res, next) => {
//     res.locals.connection = mysql.createConnection({
//         host: 'den1.mysql3.gear.host',
//         user: 'studentcornerdb',
//         password: 'root**',
//         database: 'studentcornerdb'
//     });
//     res.locals.connection.connect();
//     next();
// });


/* New Code */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');
var PORT = 8085;


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Database connection
app.use(function(req, res, next){
	global.connection = mysql.createConnection({
    host: 'den1.mysql3.gear.host',
    user: 'studentcornerdb',
    password: 'root**',
    database: 'studentcornerdb'
	});
	connection.connect();
	next();
});

// Routing
app.use('/', index);
app.use('/api/v1/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
  res.json({ error: err });
});

module.exports = app;
var server = http.createServer(app);
server.listen(PORT);
