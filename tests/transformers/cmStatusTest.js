import asJsObject from '../../src/transformers/cmStatus';
import assert from 'assert';

describe('CMStatus', function () {
	it('should properly parse a valid XML', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<cmstatus>\n' +
			'\t<provisioning_st>Online</provisioning_st>\n' +
			'\t<provisioning_st_num>12</provisioning_st_num>\n' +
			'\t<cm_comment>Operational</cm_comment>\n' +
			'\t<ds_num>32</ds_num>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>850000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>32</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>778000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>23</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>770000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>22</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>762000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>21</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>754000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>20</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>746000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>19</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>738000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>18</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>730000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>17</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>722000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>16</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>714000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>15</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>706000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>14</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>698000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>13</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>690000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>12</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>682000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>11</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>674000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>10</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>666000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>9</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>658000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>8</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>650000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>7</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>642000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>6</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>634000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>5</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>626000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>4</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>618000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>3</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>610000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>2</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>602000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>1</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>1</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<us_num>6</us_num>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>4</usid>\n' +
			'\t\t<freq>37100000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>6</usid>\n' +
			'\t\t<freq>28600000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>2.560</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>5</usid>\n' +
			'\t\t<freq>31800000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>2.560</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>3</usid>\n' +
			'\t\t<freq>44000000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>2</usid>\n' +
			'\t\t<freq>50900000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>1</usid>\n' +
			'\t\t<freq>57800000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<cm_docsis_mode>DOCSIS 3.0</cm_docsis_mode>\n' +
			'\t<cm_network_access>Allowed</cm_network_access>\n' +
			'\t<NumberOfCpes>245</NumberOfCpes>\n' +
			'\t<dMaxCpes>2</dMaxCpes>\n' +
			'\t<bpiEnable>1</bpiEnable>\n' +
			'\t<FileName>soho08_v6.bin</FileName>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>133439</Sfid>\n' +
			'\t\t<direction>2</direction>\n' +
			'\t\t<pMaxTrafficRate>42800000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>42600</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>42600</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>2</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>134322</Sfid>\n' +
			'\t\t<direction>2</direction>\n' +
			'\t\t<pMaxTrafficRate>2140000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>16320</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>16320</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>2</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>133440</Sfid>\n' +
			'\t\t<direction>1</direction>\n' +
			'\t\t<pMaxTrafficRate>321000000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>42600</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>1522</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>1</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>134323</Sfid>\n' +
			'\t\t<direction>1</direction>\n' +
			'\t\t<pMaxTrafficRate>10700000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>16320</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>1522</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>1</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>134324</Sfid>\n' +
			'\t\t<direction>1</direction>\n' +
			'\t\t<pMaxTrafficRate>64200000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>96000</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>1522</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>1</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'</cmstatus>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {
			  "cm_comment": "Operational",
		  "cm_docsis_mode": "DOCSIS 3.0",
		  "cm_network_access": "Allowed",
		  "provisioning_st": "Online",
		  "provisioning_st_num": 12,
		});
	});

	it('should throw on an incorrect schema', async () => {
		const example = '<?xml version="1.0" encoding="utf-8"?>\n' +
			'<NotTheRightOne>\n' +
			'\t<provisioning_st>Online</provisioning_st>\n' +
			'\t<provisioning_st_num>12</provisioning_st_num>\n' +
			'\t<cm_comment>Operational</cm_comment>\n' +
			'\t<ds_num>32</ds_num>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>0</freq>\n' +
			'\t\t<mod>unknown</mod>\n' +
			'\t\t<chid>0</chid>\n' +
			'\t\t<state>1</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>850000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>32</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>778000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>23</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>770000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>22</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>762000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>21</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>754000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>20</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>746000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>19</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>738000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>18</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>730000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>17</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>722000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>16</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>714000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>15</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>706000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>14</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>698000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>13</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>690000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>12</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>682000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>11</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>674000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>10</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>666000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>9</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>658000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>8</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>650000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>7</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>642000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>6</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>634000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>5</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>626000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>4</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>618000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>3</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>610000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>2</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>0</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<downstream>\n' +
			'\t\t<freq>602000000</freq>\n' +
			'\t\t<mod>256qam</mod>\n' +
			'\t\t<chid>1</chid>\n' +
			'\t\t<state>4</state>\n' +
			'\t\t<status>0</status>\n' +
			'\t\t<primarySettings>1</primarySettings>\n' +
			'\t</downstream>\n' +
			'\t<us_num>6</us_num>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>4</usid>\n' +
			'\t\t<freq>37100000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>6</usid>\n' +
			'\t\t<freq>28600000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>2.560</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>5</usid>\n' +
			'\t\t<freq>31800000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>2.560</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>3</usid>\n' +
			'\t\t<freq>44000000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>2</usid>\n' +
			'\t\t<freq>50900000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<upstream>\n' +
			'\t\t<usid>1</usid>\n' +
			'\t\t<freq>57800000</freq>\n' +
			'\t\t<power>104</power>\n' +
			'\t\t<srate>5.120</srate>\n' +
			'\t\t<state>4</state>\n' +
			'\t</upstream>\n' +
			'\t<cm_docsis_mode>DOCSIS 3.0</cm_docsis_mode>\n' +
			'\t<cm_network_access>Allowed</cm_network_access>\n' +
			'\t<NumberOfCpes>245</NumberOfCpes>\n' +
			'\t<dMaxCpes>2</dMaxCpes>\n' +
			'\t<bpiEnable>1</bpiEnable>\n' +
			'\t<FileName>soho08_v6.bin</FileName>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>133439</Sfid>\n' +
			'\t\t<direction>2</direction>\n' +
			'\t\t<pMaxTrafficRate>42800000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>42600</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>42600</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>2</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>134322</Sfid>\n' +
			'\t\t<direction>2</direction>\n' +
			'\t\t<pMaxTrafficRate>2140000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>16320</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>16320</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>2</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>133440</Sfid>\n' +
			'\t\t<direction>1</direction>\n' +
			'\t\t<pMaxTrafficRate>321000000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>42600</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>1522</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>1</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>134323</Sfid>\n' +
			'\t\t<direction>1</direction>\n' +
			'\t\t<pMaxTrafficRate>10700000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>16320</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>1522</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>1</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
			'\t<serviceflow>\n' +
			'\t\t<Sfid>134324</Sfid>\n' +
			'\t\t<direction>1</direction>\n' +
			'\t\t<pMaxTrafficRate>64200000</pMaxTrafficRate>\n' +
			'\t\t<pMaxTrafficBurst>96000</pMaxTrafficBurst>\n' +
			'\t\t<pMinReservedRate>0</pMinReservedRate>\n' +
			'\t\t<pMaxConcatBurst>1522</pMaxConcatBurst>\n' +
			'\t\t<pSchedulingType>1</pSchedulingType>\n' +
			'\t</serviceflow>\n' +
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
			'<cmstatus>\n' +
			'\t<DERP>1</DERP>\n' +
			'</cmstatus>\n';

		const json = await asJsObject(example);
		assert.deepStrictEqual(json, {});
	});
});
