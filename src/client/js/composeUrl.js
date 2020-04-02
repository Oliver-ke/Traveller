const composeUrl = (name, payload, baseUrls, keys) => {
	const base = baseUrls[name];
	switch (name) {
		case 'GEONAMES': {
			const userName = keys.GEO_USER_NAME;
			const encoded = encodeURIComponent(payload);
			const uri = `maxRows=20&placename=${encoded}&username=${userName}`;
			return `${base}?${uri}`;
		}
		case 'WEATHERBIT': {
			const apiKey = keys.WEATHERBIT_API_KEY;
			const city = encodeURIComponent(payload);
			let uri = `city=${city}&key=${apiKey}`;

			if (payload.lat && payload.lon) {
				const { lat, lon } = payload;
				uri = `key=${apiKey}&lat=${lat}&lon=${lon}`;
			}

			return `${base}?${uri}`;
		}
		case 'PIXABAY': {
			const corsProxy = 'https://cors-anywhere.herokuapp.com/';
			const apikey = keys.PIXABAY_API_KEY;
			const city = encodeURIComponent(payload);
			const uri = `key=${apikey}&q=${city}&per_page=10`;
			return `${corsProxy}${base}?${uri}`;
		}
		default: {
			return;
		}
	}
};

export default composeUrl;
