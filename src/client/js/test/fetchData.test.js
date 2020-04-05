import { fetchData } from '../fetchData';

describe('FetchData function test', () => {
	it('Should call perser with the url', async () => {
		const mockPerser = (url) => {
			return {
				json: () => `Hey, this is the url ${url}`
			};
		};
		const { data } = await fetchData('https://someurl.com', mockPerser);
		expect(data).toBe('Hey, this is the url https://someurl.com');
	});
});
