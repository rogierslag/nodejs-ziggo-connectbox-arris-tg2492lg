import asJsObject from '../../src/transformers/systemInfo';
import assert from 'assert';

describe('SystemInfo', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<cm_system_info>\n' +
			'\t<cm_docsis_mode>DOCSIS 3.0</cm_docsis_mode>\n' +
			'\t<cm_hardware_version>5.01</cm_hardware_version>\n' +
			'\t<cm_mac_addr>AC:22:05:40:CD:56</cm_mac_addr>\n' +
			'\t<cm_serial_number>DEAP71110EC8</cm_serial_number>\n' +
			'\t<cm_system_uptime>0day(s)1h:35m:48s</cm_system_uptime>\n' +
			'\t<cm_network_access>Allowed</cm_network_access>\n' +
			'</cm_system_info>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			cm_docsis_mode : 'DOCSIS 3.0',
			cm_hardware_version : '5.01',
			cm_mac_addr : 'AC:22:05:40:CD:56',
			cm_network_access : 'Allowed',
			cm_serial_number : 'DEAP71110EC8',
			cm_system_uptime : '0day(s)1h:35m:48s',
			system_uptime_in_seconds : 5748
		});
	});

	it('should ignore the uptime if not present', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<cm_system_info>\n' +
			'\t<cm_docsis_mode>DOCSIS 3.0</cm_docsis_mode>\n' +
			'\t<cm_hardware_version>5.01</cm_hardware_version>\n' +
			'\t<cm_mac_addr>AC:22:05:40:CD:56</cm_mac_addr>\n' +
			'\t<cm_serial_number>DEAP71110EC8</cm_serial_number>\n' +
			'\t<cm_network_access>Allowed</cm_network_access>\n' +
			'</cm_system_info>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			cm_docsis_mode : 'DOCSIS 3.0',
			cm_hardware_version : '5.01',
			cm_mac_addr : 'AC:22:05:40:CD:56',
			cm_network_access : 'Allowed',
			cm_serial_number : 'DEAP71110EC8'
		});
	});

	it('should throw on an incorrect schema', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<ThatIsNotIt>\n' +
			'\t<cm_docsis_mode>DOCSIS 3.0</cm_docsis_mode>\n' +
			'\t<cm_hardware_version>5.01</cm_hardware_version>\n' +
			'\t<cm_mac_addr>AC:22:05:40:CD:56</cm_mac_addr>\n' +
			'\t<cm_serial_number>DEAP71110EC8</cm_serial_number>\n' +
			'\t<cm_system_uptime>0day(s)1h:35m:48s</cm_system_uptime>\n' +
			'\t<cm_network_access>Allowed</cm_network_access>\n' +
			'</ThatIsNotIt>\n';

		try {
			await asJsObject(example);
			assert.fail('Should have thrown');
		} catch (e) {
			// Correctly thrown;
		}
	});

	it('should ignore unknown keys', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<cm_system_info>\n' +
			'\t<whatsfs>DOCSIS 3.0</whatsfs>\n' +
			'</cm_system_info>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {});
	});
});
