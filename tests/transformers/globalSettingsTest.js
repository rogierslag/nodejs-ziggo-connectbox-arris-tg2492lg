import asJsObject from '../../src/transformers/globalSettings';
import assert from 'assert';

describe('GlobalSettings', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<GlobalSettings>\n' +
			'\t<AccessLevel>1</AccessLevel>\n' +
			'\t<SwVersion>CH7465LG-NCIP-6.12.18.26-3p6-GA-NOSH</SwVersion>\n' +
			'\t<CmProvisionMode>IPv4</CmProvisionMode>\n' +
			'\t<DsLite>1</DsLite>\n' +
			'\t<GwProvisionMode>IPv6</GwProvisionMode>\n' +
			'\t<GWOperMode>IPv6</GWOperMode>\n' +
			'\t<ConfigVenderModel>CH7465LG</ConfigVenderModel>\n' +
			'\t<HideRemoteAccess>True</HideRemoteAccess>\n' +
			'\t<HideModemMode>True</HideModemMode>\n' +
			'\t<OperatorId>ZIGGO</OperatorId>\n' +
			'\t<AccessDenied>NONE</AccessDenied>\n' +
			'\t<LockedOut>Disable</LockedOut>\n' +
			'\t<CountryID>7</CountryID>\n' +
			'\t<title>Connect Box</title>\n' +
			'\t<Interface>1</Interface>\n' +
			'\t<operStatus>1</operStatus>\n' +
			'</GlobalSettings>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			"AccessDenied" : "NONE",
			"AccessLevel" : 1,
			"CmProvisionMode" : "IPv4",
			"ConfigVenderModel" : "CH7465LG",
			"CountryID" : 7,
			"DsLite" : 1,
			"GWOperMode" : "IPv6",
			"GwProvisionMode" : "IPv6",
			"HideModemMode" : true,
			"HideRemoteAccess" : true,
			"Interface" : 1,
			"LockedOut" : "Disable",
			"OperatorId" : "ZIGGO",
			"SwVersion" : "CH7465LG-NCIP-6.12.18.26-3p6-GA-NOSH",
			"operStatus" : 1,
			"title" : "Connect Box"
		});
	});

	it('should throw on an incorrect schema', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<NotTheRightOne>\n' +
			'\t<AccessLevel>1</AccessLevel>\n' +
			'\t<SwVersion>CH7465LG-NCIP-6.12.18.26-3p6-GA-NOSH</SwVersion>\n' +
			'\t<CmProvisionMode>IPv4</CmProvisionMode>\n' +
			'\t<DsLite>1</DsLite>\n' +
			'\t<GwProvisionMode>IPv6</GwProvisionMode>\n' +
			'\t<GWOperMode>IPv6</GWOperMode>\n' +
			'\t<ConfigVenderModel>CH7465LG</ConfigVenderModel>\n' +
			'\t<HideRemoteAccess>True</HideRemoteAccess>\n' +
			'\t<HideModemMode>True</HideModemMode>\n' +
			'\t<OperatorId>ZIGGO</OperatorId>\n' +
			'\t<AccessDenied>NONE</AccessDenied>\n' +
			'\t<LockedOut>Disable</LockedOut>\n' +
			'\t<CountryID>7</CountryID>\n' +
			'\t<title>Connect Box</title>\n' +
			'\t<Interface>1</Interface>\n' +
			'\t<operStatus>1</operStatus>\n' +
			'</NotTheRightOne>\n';

		try {
			await asJsObject(example);
			assert.fail('Should have thrown');
		} catch (e) {
			// Correctly thrown;
		}
	});

	it('should ignore unknown keys', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<GlobalSettings>\n' +
			'\t<DERP>1</DERP>\n' +
			'</GlobalSettings>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {});
	});
});
