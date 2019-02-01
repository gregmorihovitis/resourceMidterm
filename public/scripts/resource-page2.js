//Prevents cross-site scripting
// function escape(str) {
//   var div = document.createElement('div');
//   div.appendChild(document.createTextNode(str));
//   return div.innerHTML;
// }

$(document).ready(function () {

  //Creates individual comment container (usernamename, avatar, comment, rating) after comment is submitted
  function createCommentElement(comment) {
    var $commentPassed = `
  <section class="unique-comment">
        <img src="/images/avatar.png">
        <p class=${comment.id}</p>
        <p class=${escape(comment.comment)}</p>
      </section>`
    $('body .resource-container .comments-container').prepend($commentPassed)
    return $commentPassed;
  }

  createCommentElement();
});
