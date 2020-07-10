import {asUptime, string} from './type';
import asObject from "./asObject";

// fun=2

const typeMapper = {
	cm_docsis_mode : string,
	cm_hardware_version : string,
	cm_mac_addr : string,
	cm_serial_number : string,
	cm_system_uptime : string,
	cm_network_access : string,
};

export default async function systemInfo(xmlAsString) {
	const result = await asObject(xmlAsString, 'cm_system_info', typeMapper);
	if (result.cm_system_uptime) {
		result.system_uptime_in_seconds = asUptime(result.cm_system_uptime);
	}
	return result;
}
