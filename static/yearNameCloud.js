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

		else {
			nameData = [year.toString(), undefined]
		}

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
		name_year_data.push(this_year)

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

	return items.slice(0, 500);
}

var sortNameData = function(name_data) {
	// Sort the array based on the second element
	name_data.sort(function(first, second) {
	    return second[1] - first[1];
	});

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
	if (isNaN(parseInt(nameValue))) {
		console.log('hai');
		$("#slider").dateRangeSlider("values", new Date(parseInt(date_min), 01, 01), new Date(parseInt(date_max), 01, 01));

		var year_diff = (date_max - date_min) +1;
		var name_all_data = nameRangeData(0, year_diff, parseInt(date_min), button_clicked, nameValue);
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

		console.log(sorted_name_data)
		console.log(yearTotal)

		if (yearTotal > 0) {
			makeWords(sorted_name_data, yearTotal);

		}
		else {
			alert('we cannot find data for ' + nameValue);
		}

		$('.name_container').text(nameValue);




	} 

	else {
		var just_this_year = getData(parseInt(nameValue), button_clicked, undefined);
		var sorted_year_data = sortData(just_this_year);
		console.log(sorted_year_data)
		showData(sorted_year_data);
		var yearPersonList = [];
		var yearTotal = 0;
		for (person in current_data) {
  			yearPersonList.push(sorted_year_data[person]);
  			yearTotal += sorted_year_data[person][1];
  		}
		makeWords(yearPersonList, yearTotal);

		$("#slider").dateRangeSlider("values", new Date(parseInt(nameValue), 01, 01), new Date(parseInt(nameValue), 01, 01));

	}
	
}

var searchName = function() {
	var nameToSearch = $('.fname').val();
	searchSingleName(nameToSearch);
	$('.display_options').show();
}


