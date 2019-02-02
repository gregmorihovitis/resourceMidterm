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
    <span class="resource-text">
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
      <!-- Appends comments from JSON object  -->
      <% JSON.parse(comments).forEach(function(comment){ %>
      <section class="unique-comment">
        <img src="/images/avatar.png" height="40" width="auto" class="avatar">
        <p class="user-handle">
          <%= comment.name %>
        </p>
        <span class="comment">
          <%= comment.comment %></span>
      </section>
      <% }); %>

    </div>
  </article></div>`  
    return $resource;
  }