import {parseStringPromise} from 'xml2js';

function parse(input, typeMapper) {
	const copy = Object.assign({}, input);
	for (let key in copy) {
		if (copy.hasOwnProperty(key)) {
			const mapper = typeMapper[key];
			// console.log(copy[key], mapper, typeof mapper);
			if (!mapper) {
				delete copy[key];
			} else if (typeof mapper !== 'function' && Array.isArray(copy[key])) {
				copy[key] = Object.values(copy[key]).filter(e => e).map(e => parse(e, mapper));
			} else {
				copy[key] = mapper(copy[key][0]);
			}
		}
	}
	return copy;
}

export default async function asObject(xmlAsString, root, typeMapper) {
	const document = await parseStringPromise(xmlAsString);
	const json = JSON.parse(JSON.stringify(document))[root];
	if (!json) {
		throw new Error(`Incorrect schema supplied to ${root}`);
	}
	return parse(json, typeMapper);
}
