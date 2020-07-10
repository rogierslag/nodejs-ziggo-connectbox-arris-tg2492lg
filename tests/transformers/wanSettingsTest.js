import asJsObject from '../../src/transformers/wanSettings';
import assert from 'assert';

describe('WANSetting', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<WANSetting>\n' +
			'\t<NAPT_mode>1</NAPT_mode>\n' +
			'\t<WanMAC>00:00:00:40:CD:58</WanMAC>\n' +
			'\t<wan_ipv6_addr>\n' +
			'\t</wan_ipv6_addr>\n' +
			'\t<WanDhcpv6Srv>fe80::201:5cff:fe73:846</WanDhcpv6Srv>\n' +
			'\t<ipv6_LeaseTime>D:5 H:20 M:19 S:7</ipv6_LeaseTime>\n' +
			'\t<ipv6_LeaseExpire>Thu Jul 16 08:13:10 2020</ipv6_LeaseExpire>\n' +
			'\t<wan_ipv6_dnsaddr>\n' +
			'\t</wan_ipv6_dnsaddr>\n' +
			'\t<WanIP></WanIP>\n' +
			'\t<gateway_address>0.0.0.0</gateway_address>\n' +
			'\t<LeaseTime>None</LeaseTime>\n' +
			'\t<LeaseExpire></LeaseExpire>\n' +
			'\t<wan_ipv4_dnsaddr/>\n' +
			'\t<dslite_enable>1</dslite_enable>\n' +
			'\t<dslite_fqdn>aftr01.upc.nl</dslite_fqdn>\n' +
			'\t<dslite_addr>2001:730:2000:2::29</dslite_addr>\n' +
			'</WANSetting>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			"NAPT_mode": 1,
				 "WanIP": "" ,  "WanMAC": "00:00:00:40:CD:58",
		  "dslite_addr": "2001:730:2000:2::29",
		  "dslite_enable": true,
		  "dslite_fqdn": "aftr01.upc.nl",
		  "gateway_address": "0.0.0.0",


	});
	});

	it('should throw on an incorrect schema', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<WRONG>\n' +
			'\t<NAPT_mode>1</NAPT_mode>\n' +
			'\t<WanMAC>00:00:00:40:CD:58</WanMAC>\n' +
			'\t<wan_ipv6_addr>\n' +
			'\t</wan_ipv6_addr>\n' +
			'\t<WanDhcpv6Srv>fe80::201:5cff:fe73:846</WanDhcpv6Srv>\n' +
			'\t<ipv6_LeaseTime>D:5 H:20 M:19 S:7</ipv6_LeaseTime>\n' +
			'\t<ipv6_LeaseExpire>Thu Jul 16 08:13:10 2020</ipv6_LeaseExpire>\n' +
			'\t<wan_ipv6_dnsaddr>\n' +
			'\t</wan_ipv6_dnsaddr>\n' +
			'\t<WanIP></WanIP>\n' +
			'\t<gateway_address>0.0.0.0</gateway_address>\n' +
			'\t<LeaseTime>None</LeaseTime>\n' +
			'\t<LeaseExpire></LeaseExpire>\n' +
			'\t<wan_ipv4_dnsaddr/>\n' +
			'\t<dslite_enable>1</dslite_enable>\n' +
			'\t<dslite_fqdn>aftr01.upc.nl</dslite_fqdn>\n' +
			'\t<dslite_addr>2001:730:2000:2::29</dslite_addr>\n' +
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
			'<WANSetting>\n' +
			'\t<whatsfs>DOCSIS 3.0</whatsfs>\n' +
			'</WANSetting>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {});
	});
});
