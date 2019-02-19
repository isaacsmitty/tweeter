
$( document ).ready(function() {

  $('#textarea').on('input', function() {
    let textLength = $("#textarea").val().length;

    var counter = $('.counter').get()[0];
    counter.textContent = 140 - textLength;

    if (textLength > 140) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});
