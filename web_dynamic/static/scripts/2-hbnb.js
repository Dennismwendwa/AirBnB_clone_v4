$(document).ready(function () {
  $('input[type="checkbox"]').change(function () {
    var amenityIds = [];

    $('input[type="checkbox"]:checked').each(function () {
      amenityIds.push($(this).data('id'));
    });

    $('.amenities h4').text(amenityIds.join(', '));
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
