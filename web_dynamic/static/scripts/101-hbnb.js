$(document).ready(function () {
  $('input[type="checkbox"]').change(function () {
    var amenityIds = [];
    var stateIds = [];
    var cityIds = [];

    $('input[type="checkbox"][data-type="amenity"]:checked').each(function () {
      amenityIds.push($(this).data('id'));
    });

    $('input[type="checkbox"][data-type="state"]:checked').each(function () {
      stateIds.push($(this).data('id'));
    });

    $('input[type="checkbox"][data-type="city"]:checked').each(function () {
      cityIds.push($(this).data('id'));
    });

    var locationsTxt = stateIds.concat(cityIds).join(', ');
    $('.locations h4').text(locationsTxt);

    var checkedStatesCities = {
      'states': stateIds,
      'cities': cityIds,
    };

    checkedAmenities = amenityIds;

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


  document.addEventListener('DOMContentLoaded', function () {
    $('button').click(function () {

      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: 'application/json',
        data: JSON.stringify({
          amenities: checkedAmenities
	  states: checkedStatesCities.states,
	  cities: checkedStatesCities.cities,
	}),
        success: function (data) {

    	  document.querySelector('.places').innerHTML = '';

	  for (const place of data) {
	    const article = document.createElement('article');
	    article.innerHTML = `
	      <div class="title_box">
	        <h2>${place.name}</h2>
                <div class="price_by_night">$${place.price_by_night}</div>
              </div>
              <div class="information">
                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
              </div>
              <div class="user">
                <b>Owner:</b> ${place.user.first_name} ${place.user.last_name}
              </div>
              <div class="description">
                ${place.description}
              </div>
            `;
            document.querySelector('.places').appendChild(article);
           }
        },
        error: function (error) {
          console.error('Error fetching places:', error);
        },
      });
    });
  });
});
