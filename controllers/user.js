import passport from 'passport';
import config from '../config/database';
require('../config/passport')(passport);
import jwt from 'jsonwebtoken';
const UserModel = require("../models/user");

const OK = 200; 
const BAD_REQUEST = 400; 
const UNAUTHORIZED = 401;
const SERVER_ERROR = 500; 

const UserController = {

    async register(req, res) {
        try {
          if(!req.body.username || !req.body.password || !req.body.email){
            res.status(BAD_REQUEST).json({success: false, msg: 'Please pass username and password.'});
          } else {
          const user = await new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            reason: req.body.reason,
            muscle: [],
            cardio: [],
            food: [],
            sleep: []
          });
          user.save(function(err) {
            if (err) {
                return res.status(BAD_REQUEST).json({success: false, msg: 'Username already exists.'});
              }
              res.status(OK).json({success: true, token: token, msg: 'Successful created new user.'});
          });
          }
        } catch(err) {
            return res.status(SERVER_ERROR).json({success: false, msg: 'Error caught, please try again.'});
        }
    },

    async login(req, res) {
        try {
            const user = await UserModel.findOne({
                email: req.body.email
            })
            if(!user) {
              res.status(BAD_REQUEST).json({success: false, msg: 'Authentication failed. User not found.'});
            } else {
              console.log(req.cookie)
              console.log(req.headers)
              user.comparePassword(req.body.password, function(err, isMatch) {
                if(isMatch && !err) {
                  const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                  });
                res.status(OK).send({success: true, token: token, username: user.username, reason: user.reason});
                } else {
                res.status(UNAUTHORIZED).json({success: false, msg: 'Authentication failed. Wrong password.'});
                }
              })
            }
        } catch (error) {
            console.log(error);
            res.status(SERVER_ERROR).json({success: false, msg: 'Authentication failed. Wrong information or no account in your possesion.'});
        }
    },
     me(req, res){
        res.json({success: true, msg: 'Good'});
     }

}

export default UserController;
