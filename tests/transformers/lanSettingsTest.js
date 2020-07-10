import asJsObject from '../../src/transformers/lanSettings';
import assert from 'assert';

describe('LANSetting', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<LANSetting>\n' +
			'\t<UPnP>1</UPnP>\n' +
			'\t<LanMAC>AC:22:05:5A:FA:F7</LanMAC>\n' +
			'\t<LanIP>192.168.178.1</LanIP>\n' +
			'\t<DMZaddr>192.168.178.0</DMZaddr>\n' +
			'\t<DMZ>0</DMZ>\n' +
			'\t<LanIPv6>2a02:a212:9282:5c00:ae22:5ff:fe5a:faf7/64</LanIPv6>\n' +
			'\t<LanIPv6Prefix>2a02:a212:9282:5c00::/64</LanIPv6Prefix>\n' +
			'\t<subnetmask>255.255.255.0</subnetmask>\n' +
			'\t<DHCP_startaddress>192.168.178.10</DHCP_startaddress>\n' +
			'\t<DHCP_endaddress>192.168.178.254</DHCP_endaddress>\n' +
			'</LANSetting>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			"DHCP_endaddress": "192.168.178.254",
				 "DHCP_startaddress": "192.168.178.10",
		  "DMZ": false,
		  "DMZaddr": "192.168.178.0",
		  "LanIP": "192.168.178.1",
		  "LanIPv6": "2a02:a212:9282:5c00:ae22:5ff:fe5a:faf7/64",
		  "LanIPv6Prefix": "2a02:a212:9282:5c00::/64",
		  "LanMAC": "AC:22:05:5A:FA:F7",
		  "UPnP": true,
		  "subnetmask": "255.255.255.0"
		});
	});

	it('should throw on an incorrect schema', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<WRONG>\n' +
			'\t<UPnP>1</UPnP>\n' +
			'\t<LanMAC>AC:22:05:5A:FA:F7</LanMAC>\n' +
			'\t<LanIP>192.168.178.1</LanIP>\n' +
			'\t<DMZaddr>192.168.178.0</DMZaddr>\n' +
			'\t<DMZ>0</DMZ>\n' +
			'\t<LanIPv6>2a02:a212:9282:5c00:ae22:5ff:fe5a:faf7/64</LanIPv6>\n' +
			'\t<LanIPv6Prefix>2a02:a212:9282:5c00::/64</LanIPv6Prefix>\n' +
			'\t<subnetmask>255.255.255.0</subnetmask>\n' +
			'\t<DHCP_startaddress>192.168.178.10</DHCP_startaddress>\n' +
			'\t<DHCP_endaddress>192.168.178.254</DHCP_endaddress>\n' +
			'</WRONG>\n';

		try {
			await asJsObject(example);
			assert.fail('Should have thrown');
		} catch (e) {
			// Correctly thrown;
		}
	});

	it('should ignore unknown keys', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<LANSetting>\n' +
			'\t<whatsfs>DOCSIS 3.0</whatsfs>\n' +
			'</LANSetting>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {});
	});
});
