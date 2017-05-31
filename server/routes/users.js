let express = require('express');
let router = express.Router();
let passport = require('passport');
let jwt = require('jsonwebtoken');

let UserModel = require('../models/userModel');
const config = require('../config');

router.post('/register', function(req, res, next) {
  let newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  UserModel.addUser(newUser)
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

router.post('/authenticate', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  UserModel.getUserByUsername(username)
    .then((user) => {

      if (!user) {
        return res.json({success: false, msg: 'User not found'});
      }

      UserModel.comparePassword(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const token = jwt.sign(user, config.get('mongoose:secret'), {
              expiresIn: 604800 //1 week
            });
            res.json({
              success: true, token: 'JWT' + token, user: {
                id: user._id, name: user.username, email: user.email
              }
            });
          } else {
            return res.json({success: false, msg: 'Wrong password'});
          }
        })
        .catch((error) => {
          throw error;
        });

    })
  .catch((error) => {
    throw error;
  });
});

// router.post('/authenticate', function(req, res, next) {
//     const username = req.body.username;
//     const password = req.body.password;
//
//     UserModel.getUserByUsername(username, (err, user) => {
//       if (err) {
//         throw err;
//       }
//       if (!user) {
//         return res.json({success: false, msg: 'User not found'});
//       }
//       UserModel.comparePassword(password, user.password, (err, isMatch) => {
//         if (err) {throw err;}
//         if (isMatch) {
//           const token = jwt.sign(user, config.get('mongoose:secret'), {
//             expiresIn: 604800 //1 week
//           });
//           res.json({
//             success: true,
//             token: 'JWT' + token,
//             user: {
//               id: user._id,
//               name: user.username,
//               email: user.email
//             }
//           });
//         } else {
//           return res.json({success: false, msg: 'Wrong password'});
//         }
//       })
//     });
// });

router.get(
  '/profile',
  passport.authenticate('jwt', {session: false}),
  (req, res, next) => {
    res.send('Profile');
});

router.get('/validate', function(req, res, next) {
  res.json({user: req.user});
});

module.exports = router;
