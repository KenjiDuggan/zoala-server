import jwtstrategy from 'passport-jwt';
import extractjwt from 'passport-jwt';
const JwtStrategy = jwtstrategy.Strategy;
const ExtractJwt = extractjwt.ExtractJwt;
import UserModel from '../models/user';
const config = require('../config/database');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      UserModel.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
  };
