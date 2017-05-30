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
  return new Promise(function(resolve, reject) {
    bcrypt.hash(newUser.password, 10)
      .then((hash) => {
          newUser.password = hash;
          newUser.save()
            .then(() => resolve({success: true, msg: 'User registered'}))
            .catch(() => reject({success: false, msg: 'Failed to register user'}));
        })
      .catch((error) => {throw error;});
  });
};
