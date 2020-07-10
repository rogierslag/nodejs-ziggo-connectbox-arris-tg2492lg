import {parseStringPromise} from 'xml2js';

export default async function asObject(xmlAsString, root, typeMapper) {
	const document = await parseStringPromise(xmlAsString);
	const json = JSON.parse(JSON.stringify(document))[root];
	if (!json) {
		throw new Error(`Incorrect schema supplied to ${root}`);
	}
	for (let key in json) {
		if (json.hasOwnProperty(key)) {
			const mapper = typeMapper[key];
			if (!mapper) {
				delete json[key];
			} else {
				json[key] = mapper(json[key][0]);
			}
		}
	}
	return json;
}
