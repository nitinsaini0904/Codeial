// rendering profile
module.exports.profile = function(req,res){
  console.log("Reached profile command");
  return res.render('profile',{
    title: 'Profile'
  });
}

// rendring Sign In
module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
    title: 'Codeial | Sign In'
  });
}

// rendring Sing Up 
module.exports.signUp = function(req,res){
  return res.render('user_sign_up',{
    title: 'Codeial | Sign Up'
  });
}

// creating user
module.exports.create = function(req,res){
  // TODO later
}

// creating session 
module.exports.createSession = function(req,res){
  // TODO later
}