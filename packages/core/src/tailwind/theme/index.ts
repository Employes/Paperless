import vars from './width';
import fs from 'fs';


const strings = [];
for(const key of Object.keys(vars)) {
	let value = vars[key];

	if(Array.isArray(value)) {
		value = value.join(', ')
	}

	if(typeof value === 'string') {
		strings.push(`--width-${key}: ${value};`);
		continue;
	}


	for(const subKey of Object.keys(value)) {
		if(subKey === 'DEFAULT' && Object.keys(value).includes('500')) {
			continue;
		}

		if(subKey === 'DEFAULT' && !Object.keys(value).includes('500')) {
			strings.push(`--width-${key}: ${value[subKey]};`);
			continue;
		}

		const actualValue = value[subKey];
		strings.push(`--width-${key}-${subKey}: ${actualValue};`);
	}
}

fs.writeFileSync('./width.css', strings.join('\n'));

