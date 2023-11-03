
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
    console.log(data.status)
	} else {
	  $('#api_status').removeClass('available');
    console.log(data.status)
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
