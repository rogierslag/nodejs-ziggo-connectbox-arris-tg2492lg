const fetch = require('node-fetch');
const fs = require('fs');

/**
 * HOW TO USE
 *
 * Run `yarn` in the project root
 * Login to your Ziggo modem and open the inspector
 * Look for `getter.xml XHR requests
 * Pick the last one
 * Get the SID value from the request cookie
 * Pick the last `getter.xml` again
 * Get the token from the response headers `Set-cookie`
 * Quickly close the entire tab (if a new request is done, your token will have rotated)
 * Run the script with `SID=<your value> TOKEN=<your value> node get.js`
 */

const SID = process.env.SID;
let token = process.env.TOKEN;

if (!SID) {
	console.error(`Provide the initial session ID as the SID environment variable`);
	process.exit(1);
}

if (!token) {
	console.error(`Provide the initial token as the TOKEN environment variable`);
	process.exit(1);
}

async function run() {
	for (let fun = 0; fun < 65535; fun++) {
		const response = await fetch("http://192.168.178.1/xml/getter.xml", {
			"headers" : {
				"Accept" : "application/xml, text/xml, */*; q=0.01",
				"Accept-Language" : "en,nl;q=0.9,en-US;q=0.8,en-GB;q=0.7",
				"Cache-Control" : "no-cache",
				"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
				"Pragma" : "no-cache",
				"X-Requested-With" : "XMLHttpRequest",
				"Cookie" : `sessionToken=${token}; SID=${SID}`,
				"User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
				"Host" : '192.168.178.1',
				"Origin" : 'http://192.168.178.1',
			},
			"body" : `token=${token}&fun=${fun}`,
			"method" : "POST",
			"mode" : "cors"
		});
		const isXml = response.headers.get('content-type') === 'text/xml';
		const isValid = response.ok;

		const newToken = response.headers.get('set-cookie')
			.split(';')
			.map(e => e.trim())
			.filter(e => e.startsWith('sessionToken='))
			.map(e => e.split('=')[1])[0];

		console.log(`Switching to new token: ${newToken}`);
		if (newToken) {
			token = newToken;
		}

		if (!isValid) {
			console.error(`Response for fun '${fun} was not valid`);
			break;
		}

		const filename = `fun=${fun}.xml`;
		if (isXml) {
			const data = await response.text();
			if (data.length === 0) {
				try {
					fs.unlinkSync(filename);
				} catch (e) {
					// File did not exist to start with
				}
				console.log(`Fun=${fun} yielded empty data`);
			} else {
				fs.writeFileSync(filename, data);
				console.log(`Fun=${fun} yielded data`);
			}
		} else {
			try {
				fs.unlinkSync(filename);
			} catch (e) {
				// File did not exist to start with
			}
			console.log(`Fun=${fun} did not yield data`);
		}
	}
	console.log(`\n\nFor your next request, use the following token: ${token}`);
}

run();

process.on('SIGINT', () => console.log(`\n\nStopped! For the next request use the following token: ${TOKEN}`));
