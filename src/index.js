import express from 'express';
import path from 'path';
import getModemResponse from './requestToModem';

import systemInfo from './transformers/systemInfo';
import cmState from "./transformers/cmState";
import cmStatus from "./transformers/cmStatus";
import globalSettings from "./transformers/globalSettings";
import wanSettings from "./transformers/wanSettings";
import lanSettings from "./transformers/lanSettings";
import lanUserTable from "./transformers/lanUserTable";
import wiredState from "./transformers/wiredState";

const server = express();

const endpoints = [
	['/global-settings', 1, globalSettings],
	['/system-info', 2, systemInfo],
	['/cm-state', 136, cmState],
	['/cm-status', 144, cmStatus],
	['/lan-settings', 100, lanSettings],
	['/lan-user-table', 123, lanUserTable],
	['/wan-settings', 107, wanSettings],
	['/wired-state', 143, wiredState],
];
let cachedHealth = {};

function getHealth(cb) {
	const start = new Date();
	getModemResponse(1, async data => {
		const isAccessOk = Boolean((await globalSettings(data)).AccessLevel);
		getModemResponse(144, async data => {
			const cmStatusData = (await cmStatus(data));
			const modemState = cmStatusData.provisioning_st;
			const networkAccess = cmStatusData.cm_network_access;
			getModemResponse(123, async data => {
				const numberOfLanClients = (await lanUserTable(data)).totalClient;
				getModemResponse(2, async data => {
					const uptime = (await systemInfo(data)).system_uptime_in_seconds;
					const took = new Date() - start;
					const response = {isAccessOk, modemState, networkAccess, numberOfLanClients, uptime, took};
					cb(response);
				});
			});
		});
	});
}

function refreshHealth() {
	getHealth(data => cachedHealth = data);
}

server.get('/_health', (req, res) => {
	if (req.query.fresh === 'true') {
		// Method reference break here, so lambda it is
		getHealth(json => res.json(json));
		return;
	}
	res.json({...cachedHealth, took : 0});
});

server.get('/is-online', (req, res) => {
	getModemResponse(144, async data => {
		const modemState = (await cmStatus(data));
		res.json({
			modemState : modemState.provisioning_st,
			networkAccess : modemState.cm_network_access,
			isOnline : modemState.provisioning_st_num === 12
		});
	});
});

endpoints.forEach(([endpoint, funId, transformer]) => {
	server.get(endpoint, (req, res) => {
		getModemResponse(funId, async data => {
			const json = await transformer(data)
			res.json(json);
		});
	});
});

server.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

setInterval(refreshHealth, 60 * 1000);
refreshHealth();

server.listen(3000, () => console.log('Server has started'));
