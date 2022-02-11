const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker'); 

module.exports.create = async function(req,res){
  try {
    let post=await Post.findById(req.body.post) //  here we are first checking wheather post exist in database or not); 

    if(post){ // if we find the post    
      let comment=await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user:req.user._id            
        });      
        // now here we are updatin 'post' i.e addind data to %%post%%
        post.comments.push(comment) // pushing comment into comments into the &&same post&& 
        post.save(); 
            
        // console.log("Before populating",comment);
        comment = await comment.populate('user', 'name email');
        // console.log("After populating ",comment);
        // commentsMailer.newComment(comment);
        let job = queue.create('emails',comment).save(function(err){
          if(err){console.log('Error in sending to the queue',err); return;}

          console.log('job enqueued', job.id);
        })
        if(req.xhr){
            //console.log('possst12345=>',userDet.user.name);
            return res.status(200).json({
                data: {
                    comment: comment,
                },
                message: "comment created !"
            });
        }

        res.redirect('/');
       
    }     
} catch (error) {
    console.log('Error', error);
    return;     
}
}

module.exports.destroy = async function(req,res){

  try {
      let comment = await Comment.findById(req.params.commentId);

      let post = await Post.findById(req.params.postId);

      if(comment.user == req.user.id || post.user == req.user.id){
        
        comment.remove();

        let postI = Post.findByIdAndUpdate(req.params.postId, { $pull: { comments : req.params.commentId}});

        // send the comment id which was deleted back to the views
        if (req.xhr){
          return res.status(200).json({
              data: {
                  comment_id: req.params.commmentId
              },
              message: "Post deleted"
          });
      }

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