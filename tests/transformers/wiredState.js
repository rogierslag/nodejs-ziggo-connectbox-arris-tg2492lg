import asJsObject from '../../src/transformers/wiredState';
import assert from 'assert';

describe('CMState', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<wiredstate>\n' +
			'\t<port/>\n' +
			'\t<port/>\n' +
			'\t<port>\n' +
			'\t\t<Eth>3</Eth>\n' +
			'\t\t<Speed>1000</Speed>\n' +
			'\t</port>\n' +
			'\t<port/>\n' +
			'\t<Device>1</Device>\n' +
			'</wiredstate>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			"port": [
				{
					"Eth": 3,
					"Speed": 1000,
				}
			],
			"Device": 1
		});
	});
});
