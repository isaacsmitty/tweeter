
$( document ).ready(function() {



function renderTweets(tweets) {
  tweets.forEach(function(tweet) {
    var tweetElement = createTweetElement(tweet)
    $('#example').append(tweetElement);
  })
}

function loadTweets() {

  $.ajax({url: '/tweets'})
  .then(function(tweets) {
    renderTweets(tweets);
    console.log(tweets);
  })
}
loadTweets();


function createTweetElement(tweet) {
 const $tweet = $(`<article class='tweet-container'>
          <header>
            <img src=${tweet.user.avatars.regular}>
            <h2>${tweet.user.name}</h2>
            <span>${tweet.user.handle}</span>
          </header>
          <p>${tweet.content.text}</p>
          <footer>
            <span>${tweet.created_at}</span>
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

// renderTweets(data);



  var $submit = $('#form');

    $submit.on('submit', function(event) {
      event.preventDefault();

      $.ajax('/tweets', {
        method: 'POST',
        data: $submit.serialize()
      });
      //console.log($submit.serialize());
    });
  })




