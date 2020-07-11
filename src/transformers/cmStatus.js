import {bool, int, string} from './type';
import asObject from "./asObject";

// fun=144

const typeMapper = {
	provisioning_st : string, // DS scanning, Online
	provisioning_st_num : int, // 3=DS scanning, 12=Online
	cm_comment : string,
	cm_docsis_mode : string,
	cm_network_access : string,
};

export default async function cmState(xmlAsString) {
	return asObject(xmlAsString, 'cmstatus', typeMapper);
}
