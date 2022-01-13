const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req,res){
  
  try {
      let post = await Post.findById(req.body.post);

      if(post){
        let comment = await Comment.create({
          content : req.body.content,
          post : req.body.post,
          user : req.user._id
        });
        
        post.comments.push(comment); 
        post.save();

        req.flash('success','Comment posted!');
        return res.redirect('/');
      }
  } catch (err) {
        req.flash('error',err);
        return res.redirect('/');
      }
}

module.exports.destroy = async function(req,res){

  try {
      let comment = await Comment.findById(req.params.commentId);

      let post = await Post.findById(req.params.postId);

      if(comment.user == req.user.id || post.user == req.user.id){
        
        comment.remove();

        let postI = Post.findByIdAndUpdate(req.params.postId, { $pull: { comments : req.params.commentId}});
        req.flash('success','Comment deleted!');
        return res.redirect('back');
      }else{
        req.flash('error','You cannot delete the comment');
        return res.redirect('back');
      }
  } catch (err) {
    req.flash('error',err);
    return res.redirect('back');
  }
}