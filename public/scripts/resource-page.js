function createResourceElement(resource) {

  let $resource = `
  <article class="resource-container">
    <!-- Resource includes main image, title, and description -->
    <img src=${resource[0].img_url} class="main-img" height="280" width="auto">
    <!-- Like/Rate buttons-->
    <section class="like-rate">
    <form method="post" action="/like">
      <button class="btn" input type="submit" value=${resource[0].id} name="id"}><img src="/images/like.png"></button>
      </form>
    </section>
    <!-- Resource titles and description -->
    <span class="resource-text" >
      <h2>
        <a href=${resource[0].url}>${resource[0].title}</a>
      </h2>
      <p>${resource[0].description}</p>
    </span>
    <!--Ratings out of 5 stars-->
    <form class="rating">
  <label>
    <input type="radio" name="stars" value="1" />
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="2" />
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="3" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="4" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  <label>
    <input type="radio" name="stars" value="5" />
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
    <span class="icon">★</span>
  </label>
  </form>
    <!-- Comment submission form -->
    <section class="new-comment">
      <h4 id="compose-header">Add comment</h4>
      <form action="/comments" method="POST">
        <textarea autofocus name="text" placeholder="What do you think?"></textarea>
        <input type="hidden" name="id" value=${resource[0].id}>
        <input id='addComment' type='submit' value="comment"  ></input>
      </form>
    </section>
    <!-- Comments container: has avatars, usernames, and comment -->
    <div class="comments-container">

    </div>
  </article>
  `
  return $resource;
}

function createCommentElement(comment){
  let $comment = `
    <section class="unique-comment">
      <img src="/images/avatar.png" height="40" width="auto" class="avatar">
      <p class="user-handle">${comment.name}</p>
      <span class="comment">${comment.comment}</span>
    </section>
  `
  return $comment;
}

function renderResource(resource) {
  // console.log(createResourceElement(resource));
  $('body.mainContainer').append(createResourceElement(resource));
}

function renderComments(comments){
  // if($('.comment').val() === undefined){
    comments.forEach(currComment => {
      $('.comments-container').prepend(createCommentElement(currComment));
    });
  // }else{
    // let lastComment = comments[comments.length - 1];
    
    // $('.comments-container').prepend(createCommentElement(lastComment));
  // }
}

function addComment(){
  popComment();
}

const populateResource = () => {
  // console.log('Secret text:', $('#secret').text());

  $.ajax({
    method: "GET",
    url: `/popResource/${$('#secret').text()}`
  })
    .done((resource) => {
      renderResource(resource);

    });
}

const popComment = () => {
  $.ajax({
    method: 'GET',
    url: `/popComments/${$('#secret').text()}`
  })
    .done((comments) => {
      renderComments(comments);
    });
}

$(document).ready(function () {
  populateResource();
  popComment();

  // changes like button opacity on 'like' click  - Julia
  // $('.resource-container .like-rate').click(function () {
  //   $('.resource-container .like-rate').css({
  //     'opacity': '1'
  //   });
  // });

  // console.log('resource loaded');
})
