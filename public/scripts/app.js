
$( document ).ready(function() {



function renderTweets(tweets) {
  $('#tweet-container').empty()
  tweets.forEach(function(tweet) {
    var tweetElement = createTweetElement(tweet)
    $('#tweet-container').prepend(tweetElement);
  })
}

function loadTweets() {

  $.ajax({url: '/tweets'})
  .then(function(tweets) {
    renderTweets(tweets);
    //console.log(tweets);
  })
}
loadTweets();

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement(tweet) {
  let tweetDate = new Date(tweet.created_at);
  // let timeNow = new Date(Date.now());
  let timeElapsed = Date.now() - (tweet.created_at);


  const $tweet = $(`<article class='tweet-container'>
          <header>
            <img src=${escape(tweet.user.avatars.regular)}>
            <h2>${escape(tweet.user.name)}</h2>
            <span>${escape(tweet.user.handle)}</span>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <span>${tweetDate.toDateString()}</span>
            <div class='icons'>
              <i class="fas fa-heart"></i>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
            </div>
          </footer>
        </article>`)
  // ...
  return $tweet;
}


  var $submit = $('#form');

    $submit.on('submit', function(event) {
      event.preventDefault();

      var textArea = $('#textarea');

      $('#warning').slideUp(20);

      if (textArea.val().length === 0) {
        $('#warning').text('Your Tweeter is too short!');
        $('#warning').slideToggle('slow', function() {
          $('#textarea').focus();
        });

      } else if ( textArea.val().length >10) {
          $('#warning').text('Your Tweeter is too long!');
        $('#warning').slideToggle('slow', function() {
          $('#textarea').focus();
        });

      } else {
        $.ajax('/tweets', {
          method: 'POST',
          data: $submit.serialize()
        })
      .then(loadTweets)
      .then(textArea.val(''));
      }
    });
  $('#form-button').click(function(){
        $('#new-tweet').slideToggle('slow', function() {
          $('#textarea').focus();
        });
    });





  })





