$(document).ready(function () {
  $('input[type="checkbox"]').change(function () {
    var amenityIds = [];

    $('input[type="checkbox"]:checked').each(function () {
      amenityIds.push($(this).data('id'));
    });

    $('.amenities h4').text(amenityIds.join(', '));
  });
});
