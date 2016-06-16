$(function(){


  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    console.log(searchTerm);
    getRequest(searchTerm);
  });
});

function getRequest(searchTerm){
  var params = {
    q: searchTerm,
    part: 'snippet',
    type: 'video',
    //videoCategoryId:'', https://developers.google.com/youtube/v3/docs/videoCategories/list#parameters
    maxResults:3,
    order:'date',
    key: 'AIzaSyBNqWhJ5DVOzZe4OEavx1-aB1uQTr6KJrA'
  };

  var url = 'https://www.googleapis.com/youtube/v3/search';

  //execute Get request
  $.getJSON(url, params, function(data){
    showResults(data.part); //data.part?
  });
}

//something not working with this func
function showResults(results){
  var html = "";
  $.each(results, function(index,value){
    thumbnail = data.items.snippet.thumbnails;
    html += '<p>' + value.snippet.title + '</p>' + '<br>' +'<div>' + thumbnail +'</div>';
console.log('done');
    console.log(value.snippet.title);
  });
  $('#search-results').html(html);
}