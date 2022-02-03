{
  // Method to submit Form data using Ajax
  let createPost = function(){
    let newPostForm = $('#new-post-form');
    
    newPostForm.submit(function(e){
      e.preventDefault();
      console.log("new POst form searlise = ",newPostForm.serialize());
      $.ajax({
        type: 'POST',
        url : '/posts/create',
        data : newPostForm.serialize(),
        success: function(data){
          console.log("Post data = ", data);
          let newPost = newPostDom(data.data.post);
          $('#posts-list-container>ul').prepend(newPost);
          deletePost($(' .delete-post-button',newPost));

          new PostComments(data.data.post._id);

          new Noty({
            theme: 'relax',
            text: "Post published!",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();

        }, error : function(error){
          console.log(error.reponseText);
        }
      });
    });

  }
  

  // method to create a post by DOM
  let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
              <p>
                  
                  <small>
                      <a class="delete-post-button" href="/posts/destroy/${ post._id }">Delete</a>
                  </small>
                  ${post.content }
                  <br>
                  <small>
                    ${ post.user.name }
              </small>
              </p>

              <div class="post-comments">
                  
                      <form action="/comments/create" id="post-${post._id}-comments-form" method="post">
                          <input type="text" name="content" placeholder="Add comment"..>
                          <input type="hidden" name="post" value="${ post._id }">
                          <input type="submit" value="COMMENT">
                      </form>


                  <div class="post-comments-list">

                      <ul id="post-comments-${ post._id }">
                          
                      </ul>

                  </div>
              </div>
            </li>`);
  }

  // method to delete a post from DOM
  let deletePost = function(deleteLink){
    $(deleteLink).click(function(e){
      e.preventDefault();

      $.ajax({
        type : 'get',
        url: $(deleteLink).prop('href'),
        success: function(data){
          $(`#post-${data.data.post_id}`).remove();
          new Noty({
            theme: 'relax',
            text: "Post Deleted",
            type: 'success',
            layout: 'topRight',
            timeout: 1500
            
        }).show();
        },error : function(error){
          console.log(error.reponseText);
        }
      });
    }); 
  }


  createPost();

}