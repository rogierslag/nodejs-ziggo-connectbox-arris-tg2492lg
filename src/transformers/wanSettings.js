import {bool, string, int} from './type';
import asObject from "./asObject";

// fun=107

const typeMapper = {
	NAPT_mode : int, // TODO perhaps bool?
	WanMAC : string,
	WanIP : string,
	gateway_address : string,
	dslite_enable : bool,
	dslite_fqdn : string,
	dslite_addr : string,
};

export default async function lanSettings(xmlAsString) {
	return await asObject(xmlAsString, 'WANSetting', typeMapper);
}
