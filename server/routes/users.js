let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');

let UserModel = require('../models/userModel');

router.post('/register', function(req, res, next) {
  res.send('Users');
});

router.post('/authenticate', function(req, res, next) {
  res.send('Authenticate');
});

router.get('/profile', function(req, res, next) {
  res.send('Profile');
});

router.get('/validate', function(req, res, next) {
  res.send('Validate');
});

module.exports = router;
