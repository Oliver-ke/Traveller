// using this pattern to enable the function to be mock tested
// and remove native fetch which is not available in test env
const fetchData = async (url, parser) => {
	try {
		const res = await parser(url);
		const data = await res.json();
		return { error: null, data };
	} catch (error) {
		console.log(`${error} ${url}`);
		return { error: error, data: null };
	}
};

export { fetchData };
