'''

Python script to convert all file in the YearTextFiles directory into one json object in yearData.json

'''

import json
import glob

all_year_dict = {}
female_name_dict = {}
male_name_dict = {}

for glob in glob.glob('YearTextFiles/*.txt'):
	with open(glob) as year_file: 
		all_lines = year_file.readlines()
		year = glob.split('.')[0].split('/')[1]
		all_year_dict[year] = {}

		for line in all_lines:
			splits = line.split(',')
			if splits[1] == 'F' and len(female_name_dict) < 1001:
				female_name_dict[splits[0]] = int(splits[2].rstrip('\r\n'))
			elif splits[1] == 'M' and len(male_name_dict) < 1001:
				male_name_dict[splits[0]] = int(splits[2].rstrip('\r\n'))
			else:
				continue
		all_year_dict[year]['female'] = female_name_dict
		all_year_dict[year]['male'] = male_name_dict

		female_name_dict = {}
		male_name_dict = {}

all_info = open('yearData.json', 'w')
all_info.write(str(all_year_dict))
all_info.close()




