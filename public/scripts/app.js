
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
  })
}
loadTweets();
//used to avoid cross-scripting
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function createTweetElement(tweet) {
//function to translate 'tweet time' to 'time since'
  let timeElapsed = Date.now() - (tweet.created_at);

  var timeSince = function(date) {
  if (typeof date !== 'object') {
    date = new Date(date);
  }

  var seconds = Math.floor((new Date() - date) / 1000);
  var intervalType;

  var interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'year';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'month';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'day';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = "hour";
        } else {
          interval = Math.floor(seconds / 60);
          if (interval >= 1) {
            intervalType = "minute";
          } else {
            interval = seconds;
            intervalType = "second";
          }
        }
      }
    }
  }

  if (interval > 1 || interval === 0) {
    intervalType += 's';
  }

  return interval + ' ' + intervalType;
};

var timeString = (timeSince(new Date(Date.now() - timeElapsed)));

//parse incoming tweet object into usable html
  const $tweet = $(`<article class='tweet-container'>
  <div class="card">
  <div class="card-body">
          <header>
            <img src=${escape(tweet.user.avatars.regular)}>
            <h2>${escape(tweet.user.name)}</h2>
            <span>${escape(tweet.user.handle)}</span>
          </header>
          <p>${escape(tweet.content.text)}</p>
          <footer>
            <span>${timeString + ' ago'}</span>
            <div class='icons'>
              <i class="fas fa-heart"></i>
              <i class="fas fa-flag"></i>
              <i class="fas fa-retweet"></i>
            </div>
          </footer>
        </div>
</div>
        </article>`)
  // ...
  return $tweet;
}


//on submit -- check tweet length then give warning --
//or post to /tweets then load tweets and reset charCounter
  var $submit = $('#form');

  $submit.on('submit', function(event) {
    event.preventDefault();

    var textArea = $('#textarea');

    $('#warning').slideUp(20);

    if (textArea.val().length === 0) {
      $('#textarea').css('color', 'red', 'border-color', 'red');
      $('#warning').text('Your Tweeter is too short!');
      $('#warning').slideToggle('slow', function() {
        $('#textarea').focus();
      });

    } else if ( textArea.val().length >140) {
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
    $('.counter').html(140);
    }
  });

  $('#form-button').click(function(){
    $('#new-tweet').slideToggle('slow', function() {
      $('#textarea').focus();
    });
  });

})





