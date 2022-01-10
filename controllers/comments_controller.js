const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
  Post.findById(req.body.post, function(err,post){
    if(post){
      Comment.create({
        content : req.body.content,
        post : req.body.post,
        user : req.user._id
      }, function(err,comment){
        if(err){
          console.log('Error in adding comment to database');
          return;
        }

        post.comments.push(comment);
        post.save();

        res.redirect('/');
      });
    }
  });
}

module.exports.destroy = function(req,res){

  Comment.findById(req.params.commentId,function(err,comment){

    Post.findById(req.params.postId,function(err,post){
      if(comment.user == req.user.id || post.user == req.user.id){
      
        comment.remove();
  
        Post.findByIdAndUpdate(req.params.postId, { $pull: { comments : req.params.commentId}}, function(err,post){
          return res.redirect('back');
        });
      }else{
        return res.redirect('back');
      }
    });

  });
}