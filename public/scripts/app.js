// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });



function createResourceElement(resource) {
  let $resource = `
  <div id = ${resource.id} class="card" onClick = 'divClick(this.id)' >
  <img src=${resource.img_url} class="rThumbnail" alt="https://cdn11.bigcommerce.com/s-ccerkj57m6/images/stencil/1280x1280/products/276/666/oops__68425.1528235707.jpg?c=2&imbypass=on">
      <div class="rBody">
        <h5 class="rTitle">${resource.title}</h5>
        <p class="rContent">${resource.description}</p>
      </div>
    </div>
  `

  return $resource;
}

function renderResources(resources) {
  resources.forEach(currResource => {
    $('#neuroRow').prepend(createResourceElement(currResource));
  });
}


const populateTest = () => {
  $.ajax({
    method: "GET",
    url: "/popTest"
  })
    .done((resources) => {
      renderResources(resources);
    });;
  console.log('populated');
};

function divClick(id) {
  console.log('click');
  $.post(`/resources/${id}`)
    .then((data) => {
      window.location.href = data.url;
    });
}


$(document).ready(function () {
  populateTest();
  console.log('page loaded');
})

