// Load the YouTube API client library
gapi.load('client', start);

function start() {
  // Set the API key and client ID
  gapi.client.setApiKey('AIzaSyCYXtmMyUxxYKVn15ukUAoNBitfcYTRbeU');
  gapi.client.setClientId('YOUR_CLIENT_ID');

  // Initialize the API client library
  gapi.client.init({
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
  }).then(function() {
    console.log('YouTube API client loaded for API discovery.');

    // Add event listener for search button
    document.querySelector('#search').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchVideos();
      }
    });
  }, function(error) {
    console.error('Error loading YouTube API client for API discovery.', error);
  });
}

function searchVideos() {
  // Get the search query from the input field
  var query = document.querySelector('#search').value;

  // Use the YouTube API to search for videos
  gapi.client.youtube.search.list({
    q: query,
    part: 'snippet',
    type: 'video',
    maxResults: 10,
  }).then(function(response) {
    var results = response.result.items;
    var output = '';

    // Loop through the results and create HTML for each video
    results.forEach(function(item) {
      var videoId = item.id.videoId;
      var videoTitle = item.snippet.title;
      var videoThumbnail = item.snippet.thumbnails.default.url;

      output += '<div class="video">';
      output += '<a href="https://www.youtube.com/watch?v=' + videoId + '">';
      output += '<img src="' + videoThumbnail + '">';
      output += '<h3>' + videoTitle + '</h3>';
      output += '</a>';
      output += '</div>';
    });

    // Add the HTML to the results container
    document.querySelector('#results').innerHTML = output;
  }, function(error) {
    console.error('Error searching for videos.', error);
  });
}
