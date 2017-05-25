const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./server/config');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('node');
});

app.listen(config.get('port'),
  () => console.log('Server on port' + config.get('port')));
