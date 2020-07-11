import asJsObject from '../../src/transformers/cmState';
import assert from 'assert';

describe('CMState', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<cmstate>\n' +
			'\t<TunnerTemperature>87</TunnerTemperature>\n' +
			'\t<Temperature>69</Temperature>\n' +
			'\t<OperState>OPERATIONAL</OperState>\n' +
			'\t<wan_ipv4_addr></wan_ipv4_addr>\n' +
			'\t<wan_ipv6_addr>\n' +
			'\t\t<wan_ipv6_addr_entry>fe80::ae22:::/64</wan_ipv6_addr_entry>\n' +
			'\t\t<wan_ipv6_addr_entry>2a02:a204::::::/128</wan_ipv6_addr_entry>\n' +
			'\t</wan_ipv6_addr>\n' +
			'</cmstate>';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			"OperState" : "OPERATIONAL",
			"Temperature" : 69,
			"TunnerTemperature" : 87
		});
	});

	it('should throw on an incorrect schema', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<NotTheRightOne>\n' +
			'\t<TunnerTemperature>87</TunnerTemperature>\n' +
			'\t<Temperature>69</Temperature>\n' +
			'\t<OperState>OPERATIONAL</OperState>\n' +
			'\t<wan_ipv4_addr></wan_ipv4_addr>\n' +
			'\t<wan_ipv6_addr>\n' +
			'\t\t<wan_ipv6_addr_entry>fe80::ae22:::/64</wan_ipv6_addr_entry>\n' +
			'\t\t<wan_ipv6_addr_entry>2a02:a204::::::/128</wan_ipv6_addr_entry>\n' +
			'\t</wan_ipv6_addr>\n' +
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
			'<cmstate>\n' +
			'\t<DERP>1</DERP>\n' +
			'</cmstate>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {});
	});
});
