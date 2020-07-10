export function int(input) {
	return Number(input);
}

export function string(input) {
	return new String(input).toString();
}

export function bool(input) {
	if (input === null || input === undefined) {
		throw new Error(`Cannot convert '${input} to boolean`);
	}
	if (typeof input === 'number') {
		if (input === 0) {
			return false;
		}
		if (input === 1) {
			return true;
		}
		throw new Error(`Cannot convert number '${input} to boolean`);
	}
	if (input.toLowerCase() === 'true' || input.toLowerCase() === '1') {
		return true;
	}
	if (input.toLowerCase() === 'false' || input.toLowerCase() === '0') {
		return false;
	}
	throw new Error(`Cannot convert '${input}' to boolean`);
}

const uptimeRegex = /^(\d+)day\(s\)(\d+)h:(\d+)m:(\d+)s$/;

export function asUptime(input) {
	const match = input.match(uptimeRegex);
	if (!match) {
		throw new Error(`Could not parse ${input} as an uptime`);
	}
	const [_, days, hours, minutes, seconds] = match;
	return Number(seconds) + (Number(minutes) * 60) + (Number(hours) * 60 * 60) + (Number(days) * 24 * 60 * 60);
}
