function createResourceElement(resource) {
  
  let $resource =`
  <article class="resource-container">
    <!-- Resource includes main image, title, and description -->
    <img src=${resource.img_url} class="main-img" height="280" width="auto">
    <!-- Like/Rate buttons-->
    <section class="like-rate">
      <button class="btn"><img src="/images/like.png"></button>
    </section>
    <!-- Resource titles and description -->
    <span class="resource-text" >
      <h2>
        <a href=${resource.url}>${resource.title}</a>
      </h2>
      <p>${resource.description}</p>
    </span>
    <!-- Comment submission form -->
    <section class="new-comment">
      <h4 id="compose-header">Add comment</h4>
      <form action="/comments" method="POST">
        <textarea autofocus name="text" placeholder="What do you think?"></textarea>
        <input type="submit" value="comment">
      </form>
    </section>
    <!-- Comments container: has avatars, usernames, and comment -->
    <div class="comments-container">

    </div>
  </article>
  `  
  
  return $resource;
}

function renderResource(resource){
  console.log(createResourceElement(resource));
  $('body.mainContainer').append(createResourceElement(resource));
};

const populateResource = () => {
  console.log('Secret text:', $('#secret').text());

  $.ajax({
    method: "GET",
    url: `/popResource/${$('#secret').text()}`,
  })
    .done((resource) => {
      renderResource(resource);
    });;
}

$(document).ready(function () {
  populateResource();
 
  console.log('resource loaded');
})