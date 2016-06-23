/*GLOBAL VARIABLES*/
var searchTerm;
var nextToken;

/*SET SEARCH REQUEST BY TYPE*/
$(function(){
  $('.philosopher').click(function(event){
    event.preventDefault();
    searchTerm = $(this).text() + ' philosophy' + ' -pdf' + ' -download';
    console.log(searchTerm);
    getRequest(searchTerm);
  });

}); //doc ready end 

$(function(){
  $('.movement').click(function(event){
    event.preventDefault();
    searchTerm = $(this).text() + ' philosophy' + ' -pdf' + ' -download';
    console.log(searchTerm);
    getRequest(searchTerm);
  });

}); //doc ready end 

/*Get Search Request*/
function getRequest(searchTerm){
  //emptyFullVid(); not sure if I want this behavior!
  emptyThumbnails();
  var params = {
    q: searchTerm,
    part: 'snippet',
    type: 'video',
    videoEmbeddable: true,
    //videoCategoryId:'', https://developers.google.com/youtube/v3/docs/videoCategories/list#parameters
    maxResults:6,
    order:'date',
    order:'rating',
    order:'viewCount',
    order:'date',
    key: 'AIzaSyBNqWhJ5DVOzZe4OEavx1-aB1uQTr6KJrA',
    pageToken: nextToken
  };

  var url = 'https://www.googleapis.com/youtube/v3/search';

  //execute Get request
  $.getJSON(url, params, function(data){
    showResults(data.items);
    nextToken = data.nextPageToken;
  });
} //getRequest end

/*Show Results*/
function showResults(results){
  var html = "";
  $.each(results, function(index,value){
    thumbnail = '<img src= " ' + value.snippet.thumbnails.medium.url + ' " />';
    var singleVid = '<div class="target"><p>' + value.snippet.title + '</p>' + '<br>' +'<div>' + thumbnail +'</div></div>';

    html += singleVid;
      
    var videoPlay = function (){
      var vidLink = 'https://www.youtube.com/embed/' + value.id.videoId;
      emptyFullVid ();
      $('<iframe width="560" height="315" frameborder="0" allowfullscreen></iframe>').attr('src', vidLink).appendTo('#fullPlay');
    };
    
    var singleVid = $(singleVid); 
    console.log(singleVid); 
    singleVid.click(videoPlay);

    $('#search_results').append(singleVid);
    
  }); //each loop end

  $('.moreResults').show();//show moreResults button

} // showResults end

showMore (); // call showMore results function <--this was in wrong position

/*Swap Out Full Video When New Thumb Is Clicked*/
function emptyFullVid () {
  $('#fullPlay').empty();
}

/*Swap Out Thumbnails When New Request Is Sent*/
function emptyThumbnails () {
  $('#search_results').empty(); 
}

/*Show More Thumbnails When Show More Button Is Clicked*/
function showMore (){
    $('.moreResults').click (function () {  
    emptyThumbnails ();
    getRequest (searchTerm);
  });
}

