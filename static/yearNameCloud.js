var textHover = function(){
	$('text').hover(
		function(){
			var currentSize = $(this).css('font-size');
			$(this).css('font-size', (currentSize.split('p')[0]*2).toString() + 'px');
		}, function(){
			var newSize = $(this).css('font-size');
			$(this).css('font-size', (newSize.split('p')[0]/2).toString() + 'px');
		})
};

var getData = function(year, gender, name) {
	var currentData = [];
	var ladies = yearData['yob' + year.toString()]['female'];
	var gents = yearData['yob' + year.toString()]['male'];

	if (gender == 'both') {
		for (var lady_name in ladies) { currentData[lady_name] = ladies[lady_name]; }

    	for (var gent_name in gents) { 
    		if (gent_name in currentData) {
    			currentData[gent_name] += gents[gent_name]; 
    		}
    		else {
    			currentData[gent_name] = gents[gent_name];
    		}
    	}
	}

	else {
		currentData = yearData['yob' + year.toString()][gender]
	}
	return currentData

}

var getNameData = function(year, gender, name) {
	var nameData = [];

	if (gender == 'both') {
		if (yearData['yob' + year.toString()]['female'][name] !== undefined) {
			nameData = [year.toString(), yearData['yob' + year.toString()]['female'][name]]
		}
		else if (yearData['yob' + year.toString()]['male'][name] !== undefined) {
			nameData = [year.toString(), yearData['yob' + year.toString()]['male'][name]]
		}

		// make sure this is not causing other issues
		// else {
		// 	// nameData = [year.toString(), undefined]
		// 	continue
		// }

	}
	else {
		nameData = [year.toString(), yearData['yob' + year.toString()][gender][name]]
	}

	return nameData
}

var rangeData = function(start, year_diff, date_min, gender, name) {
	var all_data = {};

	while(start < year_diff) {
		var this_year = getData((parseInt(date_min) + start), gender, name);
		for (key in this_year) {
			if (key in all_data) {
				all_data[key] += this_year[key]
			}
			else {
				all_data[key] = this_year[key]
			}
		}
		start++
	}

	return all_data
}

var nameRangeData = function(start, year_diff, date_min, gender, name) {
	var name_year_data = [];

	while(start < year_diff) {
		var this_year = getNameData((parseInt(date_min) + start), gender, name);
		if (this_year.length > 0) {
			name_year_data.push(this_year)
		}

		start++
	}

	return name_year_data
}

var sortData = function(data_dict) {
	var items = [];
	// Create items array
	items = Object.keys(data_dict).map(function(key) {
		if (key == 'William' || key == 'David') {
		}
	    return [key, data_dict[key]];
	});

	// Sort the array based on the second element
	items.sort(function(first, second) {
	    return second[1] - first[1];
	});

	return items.slice(0, 250);
}

var sortNameData = function(name_data) {
	// Sort the array based on the second element
	name_data.sort(function(first, second) {
	    return second[1] - first[1];
	});
	// console.log(name_data);

	return name_data;
}

var showData = function(sortedData){
	$('.data_container').empty();
	var count = 1;
	for (item in sortedData) {
		$('.data_container').append('<div class="person_data">' + count + '. ' + sortedData[item][0] + ' : ' + sortedData[item][1] + '</div>');
		count++
	}
}

var showNameData = function(sortedData){
	$('.data_container').empty();
	console.log('haiii');
	var count = 1;
	for (item in sortedData) {
		if (sortedData[item][1] === undefined) {
			continue
		}
		else {
		$('.data_container').append('<div class="person_data">' + count + '. ' + sortedData[item][0] + ' : ' + sortedData[item][1] + '</div>');

		}
		count++
	}
}

var searchSingleName = function(nameValue) {
	console.log(nameValue);
	if (isNaN(parseInt(nameValue))) {
		console.log('hai');
		// $("#slider").dateRangeSlider("values", new Date(parseInt(date_min), 01, 01), new Date(parseInt(date_max), 01, 01));
		date_min = $.format.date($('#slider').dateRangeSlider("values").min, 'yyyy');
		date_max = $.format.date($('#slider').dateRangeSlider("values").max, 'yyyy');
		var year_diff = (date_max - date_min) +1;
		var name_all_data = nameRangeData(0, year_diff, parseInt(date_min), 'both', nameValue);
		// console.log(name_all_data);
		var sorted_name_data = sortNameData(name_all_data);
		showNameData(sorted_name_data);

		var yearTotal = 0;

		for (year in sorted_name_data) {
			if (sorted_name_data[year][1] !== undefined) {
				yearTotal += sorted_name_data[year][1];
			}
			else {
				sorted_name_data.splice([year], 1)
			}
		}
		console.log("yearTotal")
		console.log(yearTotal)
		if (yearTotal > 0) {
			makeWords(sorted_name_data, yearTotal);

		}
		else {
			alert('we cannot find data for ' + nameValue);
		}

		$('.name_container').text(nameValue);
		$('.years_container').text('from ' + date_min + ' to ' + date_max);
	} 

	else {
		var currentName = $('.name_container').text();
		var just_this_year;
		var sorted_year_data;
		var yearPersonList = [];

		console.log('string')
		just_this_year = getNameData(parseInt(nameValue), button_clicked, currentName);
		
		yearPersonList[0] = just_this_year;
  		// console.log(yearPersonList);
		makeWords(yearPersonList, just_this_year[1]);
		showNameData(yearPersonList);

		$("#slider").dateRangeSlider("values", new Date(parseInt(nameValue), 01, 01), new Date(parseInt(nameValue), 01, 01));
		
		$('.name_container').text(currentName);
		$('.years_container').text(nameValue);
	}

	textHover();
	
}

var searchName = function() {
	console.log('searchName')
	console.log(date_min);
	console.log(date_max);
	var nameToSearch = $('.fname').val();
	searchSingleName(nameToSearch);
	$('.display_options').show();
}



