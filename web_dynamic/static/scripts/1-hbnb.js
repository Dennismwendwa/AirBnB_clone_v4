/*
$(document).ready(function () {
  $('input[type="checkbox"]').change(function () {
    var amenityIds = [];

    $('input[type="checkbox"]:checked').each(function () {
      amenityIds.push($(this).data('id'));
    });

    $('.amenities h4').text(amenityIds.join(', '));
  });
});
*/

$(document).ready(function() {
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

});
