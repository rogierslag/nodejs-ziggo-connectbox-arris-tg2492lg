import {int, string} from './type';
import asObject from "./asObject";

// fun=123

const Client = {
	interface : string,
	IPv4Addr : string,
	IPv6Addr : string,
	index : int,
	interfaceid : int,
	hostname : string,
	MACAddr : string,
	method : int, // Not sure what this stands for though
	leaseTime : string,
	speed : string, //MBit
}

const ClientInfo = {
	clientinfo : Client,
}

const typeMapper = {
	Ethernet : ClientInfo,
	WIFI : ClientInfo,
	totalClient : int,
	Customer : string,
};

export default async function cmState(xmlAsString) {
	const result = await asObject(xmlAsString, 'LanUserTable', typeMapper);
	result.Ethernet = result.Ethernet.map(e => e.clientinfo)[0] || [];
	result.WIFI = result.WIFI.map(e => e.clientinfo)[0] || [];
	result.all = [];
	if (Array.isArray(result.Ethernet)) {
		result.all = [...result.all, ...result.Ethernet];
	}
	if (Array.isArray(result.WIFI)) {
		result.all = [...result.all, ...result.WIFI];
	}
	return result;

}
