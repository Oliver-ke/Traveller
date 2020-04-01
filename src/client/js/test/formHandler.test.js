import { uiManager } from '../formHandler';

describe('Testing handle submit funciton', () => {
	test('should uiManager fires', () => {
		const value = uiManager('START_SPINNER');
		expect(value).toBe('START_SPINNER');
	});
});
