const User = require('../models/users');
const fs = require('fs');
const path = require('path');

// rendering profile
module.exports.profile = function(req,res){
  User.findById(req.params.id, function(err,user){
    return res.render('profile',{
      title: 'User Profile',  
      profile_user : user
    });
  });
}

module.exports.update = async function(req,res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
  //     return res.redirect('back');
  //   });
  // }else{
  //   return res.status(401).send('Unauthorised');
  // }

  if(req.user.id == req.params.id){

    try {

      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req,res,function(err){
        if(err){
          console.log('***Multer Error: ',err);
        }
        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){

          if(user.avatar){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }

          // this is saving the path of the uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');
      });
      
    } catch (err) {
      req.flash('error',err);
      return res.redirect('back');
    }
  }else{
    req.flash('error','Unauthorised');
    return res.status(401).send('Unauthorised');
  }

}

// rendring Sign In
module.exports.signIn = function(req,res){

  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_in',{
    title: 'Codeial | Sign In'
  });
}

// rendring Sign Up 
module.exports.signUp = function(req,res){
  
  if(req.isAuthenticated()){
    return res.redirect('/users/profile');
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

        return res.redirect('/users/sign-in');
      });
    }else{
      return res.redirect('back');
    } 
  });
}

// creating session 
module.exports.createSession = function(req,res){
  req.flash('success','Logged in successfully');
  return res.redirect('/');
}

// creating sign-out
module.exports.destroySession = function(req,res){

  req.logout();
  req.flash('success','You have signed out!');
  return res.redirect('/');
}