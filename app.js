/*GLOBAL VARIABLES*/
var searchTerm;
var nextToken;

/*SET SEARCH REQUEST BY TYPE*/
$(function(){
  $('.philosopher').click(function(event){
    event.preventDefault();
    nextToken = "";
    searchTerm = $(this).attr('data-value') + ' philosophy' + ' -pdf' + ' -download';
    console.log(searchTerm);
    getRequest(searchTerm);
  });

  $('.movement').click(function(event){
    event.preventDefault();
    nextToken = "";
    searchTerm = $(this).attr('data-value') + ' philosophy' + ' -pdf' + ' -download';
    console.log(searchTerm);
    getRequest(searchTerm);
  });

  $('.tropes').click(function(event){
    event.preventDefault();
    nextToken = "";
    searchTerm = $(this).attr('data-value') + ' philosophy' + ' -pdf' + ' -download';
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
    //add drop=down to chose order parameter
    order:'rating',
    order:'viewCount',
    //parameter default is date
    order:'date',
    key: 'AIzaSyBNqWhJ5DVOzZe4OEavx1-aB1uQTr6KJrA',
    pageToken: nextToken
  };

  var url = 'https://www.googleapis.com/youtube/v3/search';

  //execute Get request
  $.getJSON(url, params, function(data){
    if (data.items.length === 0) {
      noResults ();
    } else {
        $('.moreResults').show();
      showResults(data.items)
    }  
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
      emptyFullVid ();
      var vidLink = 'https://www.youtube.com/embed/' + value.id.videoId;
      $('<iframe width="560" height="315" frameborder="0" allowfullscreen></iframe>').attr('src', vidLink).appendTo('#fullPlay');
      window.scrollTo(0,0);
    };
    window.scrollTo(0,950);
    var singleVid = $(singleVid); 
    console.log(singleVid); 
    singleVid.click(videoPlay);

    $('#search_results').append(singleVid);
    
  }); //each loop end

  $('.moreResults').removeClass('hidden').css('visibility', 'visible');//show moreResults button

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

function noResults () {
  $('#search_results').html('<p class="noMoreResults">There are no more results for this search. <br>Please choose another Philosopher, Movement, or Trope!</p>');
  $('.moreResults').css('visibility', 'hidden');
}

 $('#tweetIt').click(function(e){
    // tell browser not to do the default action
    e.preventDefault();
   // trigger a new window with the Twitter dialog
    window.open('http://twitter.com/share?url=undefined&text=Continental Philosophy Tube: Search for the latest Continental Philosophy vids on Youtube: ' + 'http://continentalphilosophytube.com/', 'twitterwindow', 'height=450, width=550, top='+($(window).height()/2 - 225) +', left='+$(window).width()/2 +', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  });



//$(div).append('<button data-value = " '   +  philosopher.dataValue +  ' " >'  + philosopher.name + '</button>')