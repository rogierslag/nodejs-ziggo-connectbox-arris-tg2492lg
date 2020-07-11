import asJsObject from '../../src/transformers/lanUserTable';
import assert from 'assert';

describe('LanUserTable', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<LanUserTable>\n' +
			'\t<Ethernet>\n' +
			'\t\t<clientinfo>\n' +
			'\t\t\t<interface>Ethernet 3</interface>\n' +
			'\t\t\t<IPv4Addr>192.168.178.179/24</IPv4Addr>\n' +
			'\t\t\t<IPv6Addr>2a02:a212:9282:5c00:a569:676f:2793:c47e</IPv6Addr>\n' +
			'\t\t\t<index>0</index>\n' +
			'\t\t\t<interfaceid>2</interfaceid>\n' +
			'\t\t\t<hostname>Roger-that-2</hostname>\n' +
			'\t\t\t<MACAddr>FF:FF:FF:FF:FF:FF</MACAddr>\n' +
			'\t\t\t<method>1</method>\n' +
			'\t\t\t<leaseTime>13:10:08:59</leaseTime>\n' +
			'\t\t\t<speed>1000</speed>\n' +
			'\t\t</clientinfo>\n' +
			'\t\t<clientinfo>\n' +
			'\t\t\t<interface>Ethernet 3</interface>\n' +
			'\t\t\t<IPv4Addr>192.168.178.249/24</IPv4Addr>\n' +
			'\t\t\t<IPv6Addr>2a02:a212:9282:5c00:b5a1:7614:6eca:20ba</IPv6Addr>\n' +
			'\t\t\t<index>1</index>\n' +
			'\t\t\t<interfaceid>2</interfaceid>\n' +
			'\t\t\t<hostname>Roger-That</hostname>\n' +
			'\t\t\t<MACAddr>FF:FF:FF:FF:FF:FF</MACAddr>\n' +
			'\t\t\t<method>1</method>\n' +
			'\t\t\t<leaseTime>13:09:41:02</leaseTime>\n' +
			'\t\t\t<speed>1000</speed>\n' +
			'\t\t</clientinfo>\n' +
			'\t</Ethernet>\n' +
			'\t<WIFI/>\n' +
			'\t<totalClient>2</totalClient>\n' +
			'\t<Customer>upc</Customer>\n' +
			'</LanUserTable>\n';

		const json = await asJsObject(example);

		assert.deepStrictEqual(json, {
				Customer : 'upc',
				Ethernet : [
					{
						IPv4Addr : '192.168.178.179/24',
						IPv6Addr : '2a02:a212:9282:5c00:a569:676f:2793:c47e',
						MACAddr : 'FF:FF:FF:FF:FF:FF',
						hostname : 'Roger-that-2',
						index : 0,
						interface : 'Ethernet 3',
						interfaceid : 2,
						leaseTime : '13:10:08:59',
						method : 1,
						speed : '1000'
					},
					{
						IPv4Addr : '192.168.178.249/24',
						IPv6Addr : '2a02:a212:9282:5c00:b5a1:7614:6eca:20ba',
						MACAddr : 'FF:FF:FF:FF:FF:FF',
						hostname : 'Roger-That',
						index : 1,
						interface : 'Ethernet 3',
						interfaceid : 2,
						leaseTime : '13:09:41:02',
						method : 1,
						speed : '1000'
					}
				],
				totalClient : 2,
				WIFI : [],
				all : [
					{
						IPv4Addr : '192.168.178.179/24',
						IPv6Addr : '2a02:a212:9282:5c00:a569:676f:2793:c47e',
						MACAddr : 'FF:FF:FF:FF:FF:FF',
						hostname : 'Roger-that-2',
						index : 0,
						interface : 'Ethernet 3',
						interfaceid : 2,
						leaseTime : '13:10:08:59',
						method : 1,
						speed : '1000'
					},
					{
						IPv4Addr : '192.168.178.249/24',
						IPv6Addr : '2a02:a212:9282:5c00:b5a1:7614:6eca:20ba',
						MACAddr : 'FF:FF:FF:FF:FF:FF',
						hostname : 'Roger-That',
						index : 1,
						interface : 'Ethernet 3',
						interfaceid : 2,
						leaseTime : '13:09:41:02',
						method : 1,
						speed : '1000'
					}
				]
			}
		);
	});
});
