import {bool, int, string} from './type';
import asObject from "./asObject";

// fun=136

const typeMapper = {
	TunnerTemperature : int, // TODO is this Celsius or Fahrenheit?
	Temperature : int, // TODO is this Celsius or Fahrenheit?
	OperState : string,
};

export default async function cmState(xmlAsString) {
	return asObject(xmlAsString, 'cmstate', typeMapper);
}
