$(document).ready(function(event){
	function getRecipeData (userSearch, callback){
		var baseURL = 'https://api.yummly.com/v1/api/recipes';
		var query = {
			q: userSearch, 
			_app_id: '863760f1', 
			_app_key: 'a00fc0ae6e3fc72da3b4030555e967a8'
		};
		$.getJSON(baseURL, query, callback);
	}

	function generateResultsHTML(data) {
		if (data.matches.length>0) {
		var resultsHTML = '<div class="row">';
		for (var i=0; i<data.matches.length; i++) {
			if (i>0 && i%3===0) {
				resultsHTML += '<div class="row">';
			}
			resultsHTML += 
				'<div class="col-4">' +
		            '<div class="result-card">' +
		                 '<div class="name-source">' +   
		                    '<a class="name-link" href="https://www.yummly.com/recipe/' + data.matches[i].id + '"target="_blank">' +
		                    '<h2 class="name">'+ data.matches[i].recipeName +'</h2></a>'+
		                    '<h3 class="source">By: '+ data.matches[i].sourceDisplayName +'</h3>' +
		                 '</div>' +   
		                '<div class="recipe-image">' +
		                    '<a href="https://www.yummly.com/recipe/' + data.matches[i].id + '"target="_blank">' +
		                        '<img alt="recipe-image" class="recipe-image" src="'+ data.matches[i].imageUrlsBySize['90'] +'"></a>' +
		                '</div>' +    
		                '<div class="rating-ingredients">' +
			                '<p class="rating">Rating: ' + data.matches[i].rating + '</p>' +   
			                '<p class="ingredients">Ingredients: ' + data.matches[i].ingredients.join(', ') + '</p>' +
			            '</div>' +    
		            '</div>' +
		        '</div>' ;
			if ((i+1)%3===0) {
				resultsHTML += '</div>';
			}
		}
		if (data.matches.length%3 !== 0) {
			resultsHTML+= '</div>';
		}
		resultsHTML += data.attribution.html;
		$('main').append(resultsHTML);
	} else {
		$('main').append(
			"<div class='row'><div class='col-12'><div class='no-results'>Sorry, there are no results for your search.</div></div></div>"	
			);
	}
	}
			

	function displayResults(data){
		$('h1').text('Results for ' + $('.search-input').val() );
		$('.header-contents').append('<button class="search-again">Search Again</button>');
		$('.recipe-search').remove();
		generateResultsHTML(data);
	}

	$('.recipe-search-form').submit(function(event){
		event.preventDefault();
		var userSearch = $('.search-input').val();
		getRecipeData(userSearch, displayResults);
	});

	$('.header-contents').on('click', '.search-again', function(event){
		console.log('detected');
		location.reload(true);
	});

});