$(document).ready(function () {

  let selectedAmenities = {};

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if (this.checked) {
      selectedAmenities[amenityId] = amenityName;
      $(this).parent().addClass("selected-amanity");
    } else {
      delete selectedAmenities[amenityId];
      $(this).parent().removeClass("selected-amenity");
    }

    const selectedAmenitiesList = Object.values(selectedAmenities).join(', ');
    $('.amenities h4').text(selectedAmenitiesList);
  });
 
  function checkApiStatus() {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/status/',
      type: 'GET',
      success: function(data) {
	if (data.status === 'OK') {
	  $('#api_status').addClass('available');
    
	} else {
	  $('#api_status').removeClass('available');
  
	}
      },
      error: function() {
        $('#api_status').removeClass('available');
      }
    });
  }

  checkApiStatus();

  setInterval(checkApiStatus, 5000);

});

$(document).ready(function() {

  $.ajax({
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function(data) {
      
      data.forEach(function(place) {
        const placeHTML = `
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guests</div>
              <div class="number_rooms">${place.number_rooms} Bedrooms</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
            </div>
            <div class="description">
              ${place.description}
            </div>
          </article>
        `;

        $("section.places").append(placeHTML);
      });
    },
    error: function(error) {
      console.log("Error fetching data: " + error);
    }
  });
});
