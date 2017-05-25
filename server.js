const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('./server/libs/mongoose');
const config = require('./server/config');
const errorhandler = require('errorhandler');

const app = express();

const users = require('./server/routes/users');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  res.send('node');
});

app.use('/api', users);

app.use(function(err, req, res, next) {
  if (app.get('env') === 'development') {
    let errorHandler = errorhandler();
    console.log('errorhandler catch error');
    return errorHandler(err, req, res, next);
  } else {
    res.send(500, 'Server error 500');
  }
});

app.listen(config.get('port'),
  () => console.log('Server on port' + config.get('port')));
