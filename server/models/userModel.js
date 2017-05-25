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
  User.findOne({username: username}, callback);
};

