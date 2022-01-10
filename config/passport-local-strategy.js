const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users');

// authenticating the user
passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email,password,done){
    // Find the user and establish indentity
    User.findOne({email : email},function(err,user){
      if(err){
        console.log('Error in finding the user --> Passport');
        return done(err);
      }

      if(!user || user.password != password){
        console.log('Password/Email does not match');
        return done(null,false);
      }

      return done(null,user);
    });
  }
));

// serializing the user to decide which key is to be kept in cookies
passport.serializeUser(function(user,done){
  done(null,user.id);
});

// deserailizing the user from the key used in cookies
passport.deserializeUser(function(id,done){
  User.findById(id,function(err,user){
    if(err){
      console.log('Error in finding the user --> Passport');
      return done(err);
    }
    return done(null,user);
  })
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
  // if user is signed in, allow it to access everything
  if( req.isAuthenticated() ){
    return next();
  }
  // if user is not signed in, return back to sign-in page
  return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){

  if(req.isAuthenticated()){
    // req.user contains current signed in user from session cookie
    res.locals.user = req.user;
  }

  next();
}

module.exports = passport;