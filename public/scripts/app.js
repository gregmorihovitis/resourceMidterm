//Creates and Populates each individual topic section
function createResourceElement(resource) {
  let $resource = `
  <div id = ${resource.id} class="card" onClick = 'divClick(this.id)' >
  <img src=${resource.img_url} class="rThumbnail">
      <div class="rBody">
        <h5 class="rTitle">${resource.title}</h5>
        <p class="rContent">${resource.description}</p>
      </div>
    </div>
  `

  return $resource;
}

function renderNeuro(resources) {
  resources.forEach(currResource => {
    $('#neuroRow').prepend(createResourceElement(currResource));
  });
}

function renderGraphic(resources) {
  resources.forEach(currResource => {
    $('#graphicRow').prepend(createResourceElement(currResource));
  });
}

function renderOctopus(resources) {
  resources.forEach(currResource => {
    $('#octopusRow').prepend(createResourceElement(currResource));
  });
}

function renderCreative(resources) {
  resources.forEach(currResource => {
    $('#creativeRow').prepend(createResourceElement(currResource));
  });
}


const populate = () => {
  $.ajax({
    method: "GET",
    url: "/popNeuro",
    async: true
  })
    .done((resources) => {
      renderNeuro(resources);
    });;

  $.ajax({
    method: "GET",
    url: "/popGraphic",
    async: true
  })
    .done((resources) => {
      renderGraphic(resources);
    });;

  $.ajax({
    method: "GET",
    url: "/popOctopus",
    async: true
  })
    .done((resources) => {
      renderOctopus(resources);
    });;

  $.ajax({
    method: "GET",
    url: "/popCreative",
    async: true
  })
    .done((resources) => {
      renderCreative(resources);
    });;
  // console.log('populated');
};

function divClick(id) {
  // console.log('click');
  $.post(`/resources/${id}`)
    .then((data) => {
      window.location.href = data.url;
    });
}


$(document).ready(function () {
  populate();
  // console.log('page loaded');
})

