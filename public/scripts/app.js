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
    <div class="card">
      <img src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png" class="rThumbnail" alt="https://cdn11.bigcommerce.com/s-ccerkj57m6/images/stencil/1280x1280/products/276/666/oops__68425.1528235707.jpg?c=2&imbypass=on">
      <div class="rBody">
        <h5 class="rTitle">${resource.title}</h5>
        <p class="rContent">${resource.description}</p>
        <p class="rContent">${resource.url}</p>
      </div>
    </div>
  `

  return $resource;
}

function renderResources(resources) {
  resources.forEach(currResource => {
    $('#resourceRow').prepend(createResourceElement(currResource));
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




$(document).ready(function () {
  populateTest();
})

