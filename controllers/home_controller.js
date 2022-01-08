const Post = require('../models/post');

module.exports.home = function(req,res){
  // console.log(req.cookies);
  // res.cookie('user_id',75);

  // Post.find({},function(err,post){
  //   res.render('home',{
  //     title : 'Codeial | Home',
  //     posts : post
  //   });
  //   return;
  // }); 

  Post.find({})
  .populate('user')
  .populate({
    path: 'comments',
    populate: {
      path: 'user'
    }
  })
  .exec(function(err,posts){
    res.render('home',{
      title : 'Codeial | Home',
      posts : posts
    });
    return;
  });
} 