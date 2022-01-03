const User = require('../models/users');

// rendering profile
module.exports.profile = function(req,res){
  console.log("Reached profile command");
  return res.render('profile',{
    title: 'Profile'
  });
}

// rendring Sign In
module.exports.signIn = function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('/profile');
  }

  return res.render('user_sign_in',{
    title: 'Codeial | Sign In'
  });
}

// rendring Sing Up 
module.exports.signUp = function(req,res){
  
  if(req.isAuthenticated()){
    return res.redirect('/profile');
  }
  return res.render('user_sign_up',{
    title: 'Codeial | Sign Up'
  });
}

// creating user
module.exports.create = function(req,res){
  
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }

  User.findOne({email: req.body.email},function(err,user){
    if(err){ console.log('Error in finding user in signing up'); return; }
    console.log('user is : ',user);
    if(!user){
      User.create(req.body,function(err,user){
        if(err){ console.log('Error in singing up the user'); return; }

        return res.redirect('/profile/sign-in');
      });
    }else{
      return res.redirect('back');
    } 
  });
}

// creating session 
module.exports.createSession = function(req,res){
  // TODO later
  return res.redirect('/profile');
}

// creating sign-out
module.exports.destroySession = function(req,res){

  req.logout();
  return res.redirect('/');
}