import {bool, int, string} from './type';
import asObject from "./asObject";

// fun=1

const typeMapper = {
	AccessLevel : int,
	SwVersion : string,
	CmProvisionMode : string,
	DsLite : int,
	GwProvisionMode : string,
	GWOperMode : string,
	ConfigVenderModel : string,
	HideRemoteAccess : bool,
	HideModemMode : bool,
	OperatorId : string,
	AccessDenied : string, // TODO is this the best type?
	LockedOut : string, // TODO is this the best type?
	CountryID : int,
	title : string,
	Interface : int,
	operStatus : int,
};

export default async function globalSettings(xmlAsString) {
	return asObject(xmlAsString, 'GlobalSettings', typeMapper);
}
