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
          new ToggleLike($(' .toggle-like-button', newPost));
          
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
                      <a class="delete-post-button" href="/posts/destroy/${ post._id }"><img style="width: 20px;
                      height: 20px;
                      position: relative;
                      margin-right: 15px;" class="delete-button" src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="delete-post"></a>
                  </small>
                  ${post.content }
                  <br>
                  <small>
                    ${ post.user.name }
                  </small>
              
                <br>
                <small>
                
                      <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                          0 Likes
                      </a>

                </small>
              </p>
              <div class="post-comments">
                  
                      <form action="/comments/create" id="post-${post._id}-comments-form" method="post">
                          <input type="text" name="content" placeholder="Add comment"..>
                          <input type="hidden" name="post" value="${ post._id }">
                          <input style="background-color: 2196f3;
                          padding: 3px;
                          width: auto;
                          margin-top: 10px;
                          border-radius: 10px;
                          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
                            rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;" type="submit" value="COMMENT">
                      </form>


                  <div style="outline: none;
                  border: 1px solid lightgray;
                  width: 80%;
                
                  margin-top: 10px;
                  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
                    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;" class="post-comments-list">

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