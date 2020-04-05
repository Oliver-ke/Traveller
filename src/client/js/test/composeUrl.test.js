import composeUrl from '../composeUrl';

const mockUrls = {
	RESTCOUNTRY: 'http://samplebase.com',
	GEONAMES: 'https://sample.com/api'
};

const mockedKeys = {
	GEO_USER_NAME: 'someName'
};

describe('Compose url function', () => {
	test('should return composed url', () => {
		const url = composeUrl('RESTCOUNTRY', 'usa', mockUrls);
		expect(url).toBe('http://samplebase.com/usa');
	});
	test('Should apply keys where need', () => {
		const url = composeUrl('GEONAMES', 'texas', mockUrls, mockedKeys);
		expect(url).toBe(
			'https://sample.com/api?maxRows=20&operator=OR&q=texas&name=texas&username=someName'
		);
	});
});
