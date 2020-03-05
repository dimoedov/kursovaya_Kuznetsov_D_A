// let JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
//
// // load up the user model
// let User = require('../models/user');
// let config = require('../config/database'); // get db config file
//
// module.exports = function(passport) {
//   let opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
//   opts.secretOrKey = config.secret;
//   passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.id}, function(err, user) {
//           if (err) {
//               return done(err, false);
//           }
//           if (user) {
//               done(null, user);
//           } else {
//               done(null, false);
//           }
//       });
//   }));
// };
const passport    = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy   = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    function (username, password, cb) {

        //Assume there is a DB module providing a global UserModel
        return UserModel.findOne({username, password})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'Incorrect username or password.'});
                }

                return cb(null, user, {
                    message: 'Logged In Successfully'
                });
            })
            .catch(err => {
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'nodeauthsecret'
    },
    function (jwtPayload, cb) {

        //find the user in db if needed
        return UserModel.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));