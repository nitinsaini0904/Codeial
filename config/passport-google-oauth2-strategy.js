const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/users');

// tell passport to use a new strategy for google log in
passport.use(new googleStrategy({
    clientID: "1062239007385-bitm7blk9hrckoo98ddrfsh53091jml0.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:1000/users/auth/google/callback"
  }, 

  function(accessToken, refreshToken, profile, done){
    // find a user 
    User.findOne({ email: profile.emails[0].value}).exec(function(err, user){
      if(err){ console.log('Error in google strategy passprot',err); return;}
      console.log(accessToken, refreshToken);
      console.log(profile);

      if(user){
        // if found, set this user as req.user
        return done(null, user);
      }else {
        // if not found, create the user and set it as req.user
        User.create({
          name: profile.displayName, 
          email: profile.emails[0].value,
          password: crypto.randomBytes[20].toString('hex')
        }, function(err, user){
            if(err){ console.log('Error in creating user',err); return;}

            return done(null, user);
        }); 
      }
    });
  }

));

module.exports = passport;