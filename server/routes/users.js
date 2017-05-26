let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');

let UserModel = require('../models/userModel');

router.post('/register', function(req, res, next) {
  let newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  UserModel.addUser(newUser, (err,user) => {
    if (err) {
      res.json({success: false, msg: 'Failed to register user'});
    } else {
      res.json({success: true, msg: 'User registered'});
    }
  })
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
