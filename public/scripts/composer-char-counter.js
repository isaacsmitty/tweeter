
$( document ).ready(function() {

  $('#textarea').on('input', function() {
    let textLength = 140;
    textLength -= this.attributes.placeholder.ownerElement.textLength;

    var counter = $('.counter').get()[0];
    counter.textContent = textLength;
    if (textLength < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }
  });
});

// var textbox = document.querySelector('#textarea');
// console.log(textbox);
// var count = 0;

// function callback() {
//  //console.log(event.key);
//  if (event.key === 'Backspace') {
//   count -= 1;
//   console.log(event.key, count);
// } else {
//  count += 1;
//  console.log(event.key,count);
// }
// }
// $(document).change(textbox, callback);
//   });




// $("#btn").on('click', function() {
//   console.log(this);
//.placeHolder.ownerElements.textLength