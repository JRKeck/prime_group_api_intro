var apikey = 'c73de998470877774960ef61a794f1e27274bbb6'; // Put your API key here
var results;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results);
    displayResults(results);
}

$(document).ready(function() {
console.log("Doc is ready");
	// Start the search here!
	$('body').submit('#searchForm', function(event) {
	    //$('.search-results').children().remove();
	    $('.search-results').prepend('<div class="pages page-1">page 1</div>');
	    $('.page-1').show();	    
	    $('.pagination').prepend('<li><a href="#" data-page-number="1">1</a></li>');
	    // get all the inputs into an array.
	    event.preventDefault();
	    console.log("Button Was Clicked");
	    var $inputs = $('#searchForm :input');

	    var query = $('.search-bar').val()
	    // not sure if you wanted this, but I thought I'd add it.
	    // get an associative array of just the values.
	    // var values = {};
	    // $inputs.each(function() {
	    //     values[this.name] = $(this).val();
	    // });
		results = search(query)
		
	});
	$('.pagination').on('click', 'a', function() {
		var getPageClick = $(this).text();
		console.log(this);
		console.log("pagenumber is: "+getPageClick);
		$('.pages').hide();
		$('.page-'+ getPageClick).show();
	});


	
});

function displayResults(resultsVar) {
	
	var resultsCounter = 0;
	var pageNum = 1;
	for (var i = resultsVar.length - 1; i >= 0; i--) {
		resultsCounter++;
		if (resultsCounter > 10) {
			pageNum++;
			$('.search-results').append('<div class="page-'+ pageNum +'"></div>')
			$('.pagination').append('<li><a href="#" data-page-number="'+ pageNum +'">'+ pageNum +'</a></li>');
			resultsCounter = 0;
		};

		$('.page-'+ pageNum).append('<div class="col-sm-3 col-xs-6"></div>');
		$('#game-'+ resultsVar[i].id).prepend("<div id='game-'"+ resultsVar[i].id +" class='game'></div>");
		$('#game-'+ resultsVar[i].id).prepend("<h3 class='title'>" + resultsVar[i].name + "</h3>");
		$('#game-'+ resultsVar[i].id).append('<img class="img-responsive" src="' + resultsVar[i].image.thumb_url +'" alt="Game Thumbnamil">');
	};
	
}
// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
