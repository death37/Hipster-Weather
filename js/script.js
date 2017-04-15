$(function() {
	function getPosition() {
		// Si le navigater accept la géolocalisation, on récupère la lattitude et la longitude
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = [
					position.coords.latitude,
					position.coords.longitude
				];
				function getWeather(pos) {
					$.ajax({
						url: 'http://api.wunderground.com/api/' + key + '/conditions/q/' + pos + '.json',
						dataType: 'jsonp',
						success: function(parsed_json) {
							var currentCity = parsed_json['current_observation']['display_location']['city'];
							currentCity = currentCity.replace(/[éèêë]/g, 'e');
							currentCity = currentCity.replace(/[ôö]/g, 'o');
							currentCity = currentCity.replace(/[îï]/g, 'i');
							currentCity = currentCity.replace(/[ûü]/g, 'u');
							currentCity = currentCity.replace(/[àâä]/g, 'a');
							temp_c = parsed_json['current_observation']['temp_c'];
							temp_f = parsed_json['current_observation']['temp_f'];
							var condition = parsed_json['current_observation']['icon'];
							var icon = parsed_json['current_observation']['icon_url'];
							$('#city').text(currentCity);
							$('#temp').html(temp_c + '<span id="deg">Degrees Celcius</span>');
							$('#switchTemp').on('click', function() {
								if ($('#switchTemp').attr('class') == 'switchTempF') {
									$('#switchTemp').attr('class', '');
									$('#temp').html(temp_c + '<span id="degC">Degrees Celcius</span>');
								} else {
									$('#switchTemp').attr('class', 'switchTempF');
									$('#temp').html(temp_f + '<span id="degF">Degrees Fahrenheit</span>');
								}
							});
		
							function isNight(pos) {
								$.ajax({
									url: 'http://api.wunderground.com/api/' + key + '/astronomy/q/' + pos + '.json',
									dataType: 'jsonp',
									success: function(parsed_json) {
										var sunsetHr = parsed_json['sun_phase']['sunset']['hour'];
										var sunsetMn = parsed_json['sun_phase']['sunset']['minute'];
										var sunriseHr = parsed_json['sun_phase']['sunrise']['hour'];
										var sunriseMn = parsed_json['sun_phase']['sunrise']['minute'];
										sunsetHr = parseInt(sunsetHr);
										sunsetMn = parseInt(sunsetMn);
										sunriseHr = parseInt(sunriseHr);
										sunriseMn = parseInt(sunriseMn);
										//var date = new Date();
										var hr = parsed_json['moon_phase']['current_time']['hour'];
										var mn = parsed_json['moon_phase']['current_time']['minute'];
										if (hr > sunsetHr) {
											night = true;
										} else {
											if (hr < sunriseHr) {
												night = true;
											} else if (hr == sunsetHr) {
												if (mn > sunsetMn) {
													night = true;
												} else {
													night = false;
												}
											} else if (hr == sunriseHr) {
												if (mn < sunriseMn) {
													night = true;
												} else {
													night = false;
												}
											} else {
												night = false;
											}	
										}
										switch(condition) {
											case 'clear': 										
											case 'sunny': 
												if (night == false) {
													$('#logo').attr('src', '../imgs/soleil.gif');
													$('#conditions').text('SUNNY');
													$('body').css('background-color', '#EECB6A');
													$('#hipster').attr('src', '../imgs/soleil.png');
												} else {
													$('#logo').attr('src', '../imgs/lune.gif');
													$('#conditions').text('CLEAR');
													$('body').css('background-color', '#003465');
													$('#hipster').attr('src', '../imgs/nuit.png');
												}
											break;
											case 'mostlycloudy':
											case 'mostlysunny':
											case 'partlycloudy':
											case 'partlysunny': 
												if (night == false) {
													$('#logo').attr('src', '../imgs/soleil_nuage.gif');
													$('body').css('background-color', '#CDAF79');
													$('#hipster').attr('src', '../imgs/nuage_soleil.png');
												} else {
													$('#logo').attr('src', '../imgs/lune_nuages.gif');
													$('body').css('background-color', '#202D4B');
													$('#hipster').attr('src', '../imgs/nuit.png');
												}
												$('#conditions').text('PARTLY CLOUDY');
											break;
											case 'chanceflurries':
											case 'chancerain':
											case 'chancesleet':
											case 'chancesnow':
											case 'chancetstorms':
											case 'cloudy': 
												if (night == false) {
													$('#logo').attr('src', '../imgs/nuages.gif');
													$('body').css('background-color', '#809EAC');
													$('#hipster').attr('src', '../imgs/nuages.png');
												} else {
													$('#logo').attr('src', '../imgs/lune_nuages.gif');
													$('body').css('background-color', '#202D4B');
													$('#hipster').attr('src', '../imgs/nuit.png');
												}
												$('#conditions').text('CLOUDY');										
											break;
											case 'sleet':
											case 'rain': 
												if (night == false) {
													$('#logo').attr('src', '../imgs/pluie.gif');
													$('body').css('background-color', '#536978');
													$('#hipster').attr('src', '../imgs/pluie.png');
												} else {
													$('#logo').attr('src', '../imgs/lune_pluie.gif');
													$('body').css('background-color', '#0A3541');
													$('#hipster').attr('src', '../imgs/nuit.png');
												}
												$('#conditions').text('RAINY');
											break;
											case 'fog':
											case 'hazy': 
												if (night == false) {
													$('#logo').attr('src', '../imgs/brume.gif');
													$('body').css('background-color', '#DDD8D0');
													$('#hipster').attr('src', '../imgs/brume.png');
												} else {
													$('#logo').attr('src', '../imgs/lune_brume.gif');
													$('body').css('background-color', '#434139');
													$('#hipster').attr('src', '../imgs/nut.png');
												}
												$('#conditions').text('FOGGY');
											break;
											case 'tstorms':
											case 'unknown':  
												if (night == false) {
													$('#logo').attr('src', '../imgs/orage.gif');
													$('body').css('background-color', '#5E7C7B');
													$('#hipster').attr('src', '../imgs/orage.png');
												} else {
													$('#logo').attr('src', '../imgs/lune_orage.gif');
													$('body').css('background-color', '#2C2E07');
													$('#hipster').attr('src', '../imgs/nuit.png');
												}
												$('#conditions').text('STORMY');
											break;
											case 'flurries':  
											case 'snow': 
												if (night == false) {
													$('#logo').attr('src', '../imgs/neige.gif');
													$('body').css('background-color', '#B1C0C8');
													$('#hipster').attr('src', '../imgs/neige.png');
												} else {
													$('#logo').attr('src', '../imgs/lune_neige.gif');
													$('body').css('background-color', '#4D4D4F');
													$('#hipster').attr('src', '../imgs/nuit.png');
												}
												$('#conditions').text('SNOWY');
											break;
											default: $('#logo').attr('src', icon);
										}
									}
								});	
							}	
							isNight(pos);			
						},
					});
				}						
				getWeather(pos);
				$('#mainTitre').on('click', function() {
					$('#city').toggle();
					$('#divCity').append('<input type="text" id="searchState" placeholder="State (CA, NY, TX...) or Country (England, France...)"/><div id="searchStateBtns"><button id="validState">OK</button><button id="cancelState">Cancel</button></div>');			
					$('#validState').on('click', function() {
						var newLocationState  = $('#searchState').val();
						newLocationState.toLowerCase();
						$('#searchState').toggle();
						$('#searchStateBtns').toggle();
						$('#divCity').append('<input type="text" id="searchTown" placeholder="City"/><div id="searchTownBtns"><button id="validTown">OK</button><button id="cancelTown">Cancel</button></div>');
						$('#validTown').on('click', function() {
							var newLocationCity  = $('#searchTown').val();
							var newUrl = 'http://api.wunderground.com/api/' + key + '/geolookup/q/' + newLocationState + '/' + newLocationCity + '.json';
							$('#searchTown').toggle();
							$('#searchTownBtns').toggle();
							if (newLocationState == 'france') {
								newLocationCity = newLocationCity.replace(/[ ]/g, '-');
								newUrl = 'http://api.wunderground.com/api/' + key + '/geolookup/lang:FR/q/' + newLocationState + '/' + newLocationCity + '.json';
							} else {
								newLocationCity = newLocationCity.replace(/[ ]/g, '_');
							}
						
							$.ajax({
								url: newUrl,
								dataType: 'jsonp',
								success: function(parsed_json) {
									var results = parsed_json['response']['results'];
									if (results) {
										for (var i = 0; i < results.length; i++) {
											$('#divCity').append('<div id="cityChoiceDiv"><h3 id="cityChoice"><button class="cityChoiceBtn" id="' + results[i].zmw + '">' + results[i].name + ' (' + results[i].state + ')</button></h3></div>');
											$('.cityChoiceBtn').on('click', function(data) {
												var newPos = 'zmw:' + $(this).attr('id');
												getWeather(newPos);
												$('#divCity').html('<h1 id="city">' + newLocationCity.toUpperCase() + '</h1>');
												$('#switchTemp').on('click', function() {
													if ($('#switchTemp').attr('class') == 'switchTempF') {
														$('#switchTemp').attr('class', '');
														$('#temp').html(temp_c + '<span id="degC">Degrees Celcius</span>');
													} else {
														$('#switchTemp').attr('class', 'switchTempF');
														$('#temp').html(temp_f + '<span id="degF">Degrees Fahrenheit</span>');
													}
												});		
											});
										}
									} else {
										var lat = parsed_json['location']['lat'];
										var lon = parsed_json['location']['lon'];
										var newPos = lat + ',' + lon;
										getWeather(newPos);
										$('#searchTown').toggle();
										$('#searchTownBtns').toggle();
										$('#divCity').html('<h1 id="city">' + newLocationCity.toUpperCase() + '</h1>');
										$('#switchTemp').on('click', function() {
											if ($('#switchTemp').attr('class') == 'switchTempF') {
												$('#switchTemp').attr('class', '');
												$('#temp').html(temp_c + '<span id="degC">Degrees Celcius</span>');
											} else {
												$('#switchTemp').attr('class', 'switchTempF');
												$('#temp').html(temp_f + '<span id="degF">Degrees Fahrenheit</span>');
											}
										});
									}
								}		
							});
						});
						$('#cancelTown').on('click', function() {
							$('#searchTown').toggle();
							$('#searchTownBtns').toggle();
							$('#city').show();
						});
					});
					$('#cancelState').on('click', function() {
						$('#searchState').toggle();
						$('#searchStateBtns').toggle();
						$('#city').show();
					});
				});
			});
		}
	}
	getPosition();
});