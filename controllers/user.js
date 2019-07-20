const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const User = require("../models/user");

module.exports = {

    async register(req, res) {
        try {
          if(!req.body.username || !req.body.password || !req.body.email){
            res.json({success: false, msg: 'Please pass username and password.'});
          } else {
          const user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            muscle: [],
            cardio: [],
            food: [],
            sleep: []
          });

          user.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
              }
              res.json({success: true, msg: 'Successful created new user.'});
          });
          }
        } catch(err) {
            return res.json({success: false, msg: 'Error caught, please try again.'});
        }
    },

    async login(req, res) {
        try {
            const email = req.body.email;

            await User.findOne({
                email: email
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
                      res.send({success: true, token: 'JWT ' + token});
                    } else {
                      res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                    }
                  });
                }
              })
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, msg: 'Authentication failed. Wrong information or no account in your possesion.'});
        }
    },

     me(req, res){
        res.send({success: true, msg: 'Good'});
     }

}
