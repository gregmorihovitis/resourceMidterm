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
  
  function renderMine(resources) {
    resources.forEach(currResource => {
      $('#myRow').prepend(createResourceElement(currResource));
    });
  }
  
  function renderLiked(resources) {
    resources.forEach(currResource => {
      $('#likedRow').prepend(createResourceElement(currResource));
    });
  }
  
  
  
  const populate = () => {
    $.ajax({
      method: "GET",
      url: "/popMine",
      async: true
    })
      .done((resources) => {
        renderMine(resources);
      });;
  
    $.ajax({
      method: "GET",
      url: "/popLiked",
      async: true
    })
      .done((resources) => {
        renderLiked(resources);
      });;
  };
  
  function divClick(id) {
    console.log('click');
    $.post(`/resources/${id}`)
      .then((data) => {
        window.location.href = data.url;
      });
  }
  
  
  $(document).ready(function () {
    populate();
    console.log('page loaded');
  })
  
  