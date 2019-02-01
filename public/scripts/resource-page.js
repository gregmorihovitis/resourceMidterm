//Prevents cross-site scripting
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//fetches new comments from comments page
function loadComments() {
  $('.posted-comments').empty();
  $.ajax({
    method: "GET",
    url: "/comments",
    dataType: "json"
  })
    .done(function (commentData) {
      rendercomments(commentData);
    })
}

//Displays all comments
function renderComments(comments) {
  // loops through comments
  for (let comment = 0; comment < comments.length; comment++) {
    // calls createCommentElement for each comment
    // takes return value and appends it to the comments container
    $('.container .posted-comments').prepend(createCommentElement(comments[comment]))
  }
}


//Creates individual comment container (usernamename, avatar, comment, rating) after comment is submitted
function createCommentElement(comment) {
  var $commentPassed = `
  <section class="unique-comment">
        <img src="/images/avatar.png">
        <p class=${comment.user.name}</p>
        <p class=${escape(comment.content.text)}</p>
      </section>`
  return $commentPassed;
}

$(document).ready(function () {

  loadComments();

  // Ajax post request to submit comments
  $('.new-comment form').on('submit', function (event) {
    event.preventDefault()
    //once a form is submitted loadedComments only prepends the most recent post
    firstLoad = false;
    $.ajax({
      method: "POST",
      url: "/comments",
      data: $(this).serialize()
    })
      .done(function () {
        loadComments()
        $('.new-comment form textarea').val('');
      })
  });
});
