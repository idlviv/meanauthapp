const mongoose = require('../libs/mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

let UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel;

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function(username, callback) {
  query = {username: username};
  User.findOne(query, callback);
};

module.exports.addUser = function(newUser) {
  bcrypt.hash(newUser.password, 10)
    .then((hash) => {
        newUser.password = hash;
        newUser.save()
          .then(
            function(user) {
              console.log('user', user);
              return user; //{success: true, msg: 'User registered'};
            })
          .catch(
            function(err) {
              console.log('err', err);

              return {success: false, msg: 'Failed to register user'};
            });
      })
    .catch(err => {
      throw err;
    });

  // bcrypt.genSalt(10, (err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err) throw err;
  //     newUser.password = hash;
  //     newUser.save(callback);
  //   })
  // });
};
