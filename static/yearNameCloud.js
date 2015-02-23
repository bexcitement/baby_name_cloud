var getData = function(year, gender) {
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

var rangeData = function(start, year_diff, date_min, gender) {
	var all_data = {};

	while(start < year_diff) {
		var this_year = getData((parseInt(date_min) + start), gender);
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

	return items.slice(0, 1001);
}

var showData = function(sortedData){
	$('.data_container').empty();
	for (item in sortedData) {
		$('.data_container').append('<div class="person_data">' + sortedData[item][0] + ' : ' + sortedData[item][1] + '</div>');
	}
}
