var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user')
const mongoose = require('mongoose')

var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            // console.log(jwt_payload);
            User.findOne({id: jwt_payload.id}, (err, user) => {
                if(err) 
                    return done(err, false);
                else if(user) 
                    return done(null, user);
                else return done(null, false);
            }).catch(err => console.log(err));
        })
    )
}