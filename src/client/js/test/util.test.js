import { isDataValid, formatToStringArray } from '../utils';

describe(' isDateValid util tests', () => {
	it('Should return error for backward dates', () => {
		const date = new Date('04/03/2019');
		const { error, days } = isDataValid(date);
		expect(error).toBe('Date is behind');
		expect(days).toBe(null);
	});
	it('Should return error for date difference > 16', () => {
		const date = new Date('10/04/2020');
		const { error, days } = isDataValid(date);
		expect(error).toBe('Can only get forcast for 16 days max');
		expect(days).toBe(null);
	});
	it('Should return days for valid dates', () => {
		const date = new Date('04/10/2020');
		const { error } = isDataValid(date);
		expect(error).toBe(null);
	});
});

describe('formatToStringArray util test', () => {
	const mockedObjectArray = [
		{
			name: 'Oliver',
			likes: 'Drinks',
			hates: 'Alcohol'
		}
	];
	const value = formatToStringArray(mockedObjectArray, 'likes');
	expect(value).toContain('Drinks');
});
