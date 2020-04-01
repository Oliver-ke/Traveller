// util to make api request
export default async (url, payload = null, httpMethod = 'GET') => {
	const reqConfig = {
		method: httpMethod,
		headers: {
			'Content-Type': 'application/json'
		}
	};
	try {
		if (payload) {
			reqConfig.body = JSON.stringify(payload);
			if (process.env.NODE_ENV === 'test') {
				return { error: null, data: { ...payload } };
			}
			const res = await fetch(url, reqConfig);
			const data = await res.json();
			return { error: null, data };
		}
		if (process.env.NODE_ENV === 'test') {
			return { error: null, data: { ...payload } };
		}
		let res = await fetch(url, reqConfig);
		let data = await res.json();
		return { error: null, data };
	} catch (error) {
		console.log(error);
		return { error: 'Error making request', data: null };
	}
};
