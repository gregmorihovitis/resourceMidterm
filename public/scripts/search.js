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
  
  function renderSearch(resources) {
    resources.forEach(currResource => {
      $('#searchRow').prepend(createResourceElement(currResource));
    });
  }
  
  
  const populate = () => {
    $.ajax({
      method: "GET",
      url: `/popSearch/${$('#secret').text()}`,
    })
      .done((resources) => {
        renderSearch(resources);
      });;
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
    // console.log('search completed');
  })
  
  