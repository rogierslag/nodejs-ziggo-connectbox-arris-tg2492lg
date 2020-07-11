import {int} from './type';
import asObject from "./asObject";

// fun=143

const Port = {
	Eth : int,
	Speed : int,
}

const typeMapper = {
	port : Port,
	Device : int
};

export default async function cmState(xmlAsString) {
	return asObject(xmlAsString, 'wiredstate', typeMapper);
}
