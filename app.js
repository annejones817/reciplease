$(document).ready(function(event){
		var _app_id = '863760f1'; 
		var _app_key = 'a00fc0ae6e3fc72da3b4030555e967a8';
		var userSearch = '';
		var counter = 0;

////////////////////Get Data from API/////////////////////////////////

	function getRecipeData (userSearch, callback){
		var baseURL = 'https://api.yummly.com/v1/api/recipes';
		var query = {
			q: userSearch, 
			_app_id: _app_id, 
			_app_key: _app_key
		};
		$.ajax({
		  url: baseURL,
		  data: query
		}).done(function(results) {
		  results.matches.forEach(function(element){
			baseURL = 'https://api.yummly.com/v1/api/recipe/' + element.id;
			query = {
				_app_id: _app_id, 
				_app_key: _app_key
				}; 
			$.getJSON(baseURL, query, callback);
		  })
		});
	}

/////////////////////Generate Results HTML////////////////////////

	function generateResultsHTML(data) {
		var resultsHTML = '';
		if(counter%2===0) {
		resultsHTML += '<div class="row">' + 
							'<div class="col-6">' +
					            '<div class="result-card">' +
					                '<div class="name-source">' +   
					                    '<a class="name-link" href="https://www.yummly.com/recipe/' + data.id + '"target="_blank">' +
					                    '<h2 class="name">'+ data.name +'</h2></a>'+
					                    '<h3 class="source">By: '+ data.source.sourceDisplayName +'</h3>' +
					                '</div>' +   
					                '<div class="recipe-image">' +
					                    '<a href="https://www.yummly.com/recipe/' + data.id + '"target="_blank">' +
					                        '<img alt="recipe-image" class="recipe-image" src="'+ data.images[0].imageUrlsBySize['360'] +'"></a>' +
					                '</div>' +    
					                '<div class="rating-ingredients">' +
						                '<p class="rating">Rating: ' + data.rating + '</p>' +   
						                '<p class="ingredients">Ingredients: ' + data.ingredientLines.join(', ') + '</p>' +
						            '</div>' +    
		            			'</div>' +
		        			'</div>';
		} else {
			resultsHTML += '<div class="col-6">' +
					            '<div class="result-card">' +
					                '<div class="name-source">' +   
					                    '<a class="name-link" href="https://www.yummly.com/recipe/' + data.id + '"target="_blank">' +
					                    '<h2 class="name">'+ data.name +'</h2></a>'+
					                    '<h3 class="source">By: '+ data.source.sourceDisplayName +'</h3>' +
					                '</div>' +   
					                '<div class="recipe-image">' +
					                    '<a href="https://www.yummly.com/recipe/' + data.id + '"target="_blank">' +
					                        '<img alt="recipe-image" class="recipe-image" src="'+ data.images[0].imageUrlsBySize['360'] +'"></a>' +
					                '</div>' +    
					                '<div class="rating-ingredients">' +
						                '<p class="rating">Rating: ' + data.rating + '</p>' +   
						                '<p class="ingredients">Ingredients: ' + data.ingredientLines.join(', ') + '</p>' +
						            '</div>' +    
			            		'</div>' +
			        		'</div>' +
		        		'</div>';
		}         
		counter += 1;
		console.log(resultsHTML);
		$('main').append(resultsHTML);
	}

///////////////////Display Results////////////////////////////////////////////			

	function displayResults(data){
		$('h1').text('Results for ' + userSearch );
		$('.recipe-search').remove();
		generateResultsHTML(data);
	}

/////////////////Event Listeners////////////////////////////////////////////////	

	$('.recipe-search-form').submit(function(event){
		event.preventDefault();
		userSearch = $('.search-input').val();
		getRecipeData(userSearch, displayResults);
	});

	$('.header-contents').on('click', '.search-again', function(event){
		location.reload(true);
	});

});