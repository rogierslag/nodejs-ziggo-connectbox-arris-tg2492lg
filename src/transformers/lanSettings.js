import {bool, string} from './type';
import asObject from "./asObject";

// fun=100

const typeMapper = {
	UPnP : bool,
	LanMAC : string,
	LanIP : string,
	DMZaddr : string,
	DMZ : bool,
	LanIPv6 : string,
	LanIPv6Prefix : string,
	subnetmask : string,
	DHCP_startaddress : string,
	DHCP_endaddress : string,
};

export default async function wanSettings(xmlAsString) {
	return await asObject(xmlAsString, 'LANSetting', typeMapper);
}
