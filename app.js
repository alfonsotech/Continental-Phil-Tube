$(function(){
  $('.philosopher').click(function(event){
    event.preventDefault();
    var searchTerm = $(this).text() + ' philosophy';
    console.log(searchTerm);
    getRequest(searchTerm);
  });

}); //doc ready end 

$(function(){
  $('.movement').click(function(event){
    event.preventDefault();
    var searchTerm = $(this).text() + ' philosophy';
    console.log(searchTerm);
    getRequest(searchTerm);
  });

}); //doc ready end 


function getRequest(searchTerm){
  var params = {
    q: searchTerm,
    part: 'snippet',
    type: 'video',
    videoEmbeddable: true,
    //videoCategoryId:'', https://developers.google.com/youtube/v3/docs/videoCategories/list#parameters
    maxResults:5,
    order:'date',
    order:'rating',
    order:'viewCount',
    order:'date',
    key: 'AIzaSyBNqWhJ5DVOzZe4OEavx1-aB1uQTr6KJrA'
  };

  var url = 'https://www.googleapis.com/youtube/v3/search';

  //execute Get request
  $.getJSON(url, params, function(data){
    showResults(data.items);
  });
} //getRequest end

function showResults(results){
  var html = "";
  $.each(results, function(index,value){
    thumbnail = '<img src= " ' + value.snippet.thumbnails.default.url + ' " />';
  var singleVid = '<div class="target"><p>' + value.snippet.title + '</p>' + '<br>' +'<div>' + thumbnail +'</div></div>';

  html += singleVid;
    
  var videoPlay = function (){
    var vidLink = 'https://www.youtube.com/embed/' + value.id.videoId;
    
    $('<iframe width="560" height="315" frameborder="0" allowfullscreen></iframe>').attr('src', vidLink).appendTo('#fullPlay');
  };
    
  var singleVid = $(singleVid); 
    console.log(singleVid); 
    singleVid.click(videoPlay);
    $('#search-results').append(singleVid);
  });
  //$('#search-results').html(html);
} // showResults end


