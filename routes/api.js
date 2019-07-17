const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const Workout = require('../models/workout');

router.get('/test', function(req, res) {
  res.json('wtf')
})

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/login', function(req, res) {
  console.log(req.headers);
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800
          });
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/workout', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newWorkout = new Workout({
      name: req.body.name,
      reps: req.body.reps,
      weight: req.body.weight,
      description: req.body.description
    });
    newWorkout.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save workout failed.'});
      }
      res.json({success: true, msg: 'Successful created new workout.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/workout', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Workout.find(function (err, workouts) {
      if (err) return next(err);
      res.json(workouts);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
