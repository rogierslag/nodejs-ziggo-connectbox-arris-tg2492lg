const fetch = require('node-fetch');

const host = process.env.HOST || '192.168.178.1';

const defaultHeaders = {
	"Accept-Language" : "en,nl;q=0.9,en-US;q=0.8,en-GB;q=0.7",
	"Cache-Control" : "no-cache",
	"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
	"Pragma" : "no-cache",
	"User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
	"Host" : host,
	"Origin" : `http://${host}`,
	"X-Requested-With" : "XMLHttpRequest",
}

let sid = null;
let token = null;
const toProcess = [];
let isPolling = false;

async function login() {
	// First get some session token
	const index = await fetch(`http://${host}/index.html`, {
		"headers" : {
			...defaultHeaders,
			"Accept" : "text/html",
			"User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
		},
	});
	const firstToken = getTokenFromResponse(index);
	const password = process.env.PASSWORD;

	if (!password) {
		console.error('No password specified');
		process.exit(1);
	}

	// Use that to get the actual SID an dtoken
	const body = `token=${firstToken}&fun=15&Username=NULL&Password=${password}`;
	const response = await fetch(`http://${host}/xml/setter.xml`, {
		"headers" : {
			...defaultHeaders,
			"Accept" : "text/plain, */*; q=0.01",
		},
		"body" : body,
		"method" : "POST",
	});
	if (!response.ok) {
		console.error('Specified password incorrect');
		process.exit(2);
	}
	try {
		sid = (await response.text()).split(';')[1].split('=')[1].trim();
		token = getTokenFromResponse(response);
	} catch (e) {
		console.error('Could not extract SID or token', e);
		process.exit(3);
	}
	console.info('Login successful');

	poll();
}

function getTokenFromResponse(response) {
	return response.headers.get('set-cookie')
		.split(';')
		.map(e => e.trim())
		.filter(e => e.startsWith('sessionToken='))
		.map(e => e.split('=')[1])[0];
}

async function getInternally(funId) {
	const response = await fetch(`http://${host}/xml/getter.xml`, {
		"headers" : {
			...defaultHeaders,
			"Accept" : "application/xml, text/xml, */*; q=0.01",
			"User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
		},
		"body" : `token=${token}&fun=${funId}`,
		"method" : "POST",
		"mode" : "cors"
	});

	const newToken = getTokenFromResponse(response);
	if (newToken) {
		token = newToken;
	}

	return await response.text();
}

async function poll() {
	if (toProcess.length === 0) {
		isPolling = false;
		return;
	}

	isPolling = true;
	const {funId, cb} = toProcess.shift();

	const data = await getInternally(funId);
	cb(data);
	poll();
}

export default async function get(funId, cb) {
	toProcess.push({funId, cb});
	if (!isPolling && token !== null && sid !== null) {
		poll();
	}
}

login();
