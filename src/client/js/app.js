// This file mostly puts all the moving parts together

import { locationEle, dateEle, spinnerEle, errorEle } from './domElements';
import { fetchData } from './fetchData';
import composeUrl from './composeUrl';
import { baseUrls, keys } from './credentials';
import { filterUtil, formatToStringArray } from './utils';
import uiManager from './uiManager';

const usersResource = {
	weather: {},
	countryInfo: {},
	pictures: []
};

const getTripHandler = async (e) => {
	e.preventDefault();
	const location = locationEle.value;
	const date = dateEle.value;

	if (!location) {
		return uiManager('SHOW_ERROR', errorEle, 'Provide a location');
	}

	uiManager('CLEAR_ERROR', errorEle);
	uiManager('START_SPINNER', spinnerEle);

	const geoUrl = composeUrl('GEONAMES', 'Ghana', baseUrls, keys);
	const { error, data } = await fetchData(geoUrl, fetch);

	if (error || !data.postalCodes) {
		uiManager('STOP_SPINNER', spinnerEle);
		return uiManager('SHOW_ERROR', errorEle, 'Could not find Location');
	}

	const correctMatch = filterUtil(data.postalCodes, 'placeName', 'Ghana');
	if (correctMatch.length < 1) {
		// no matches found, get weather details using city name
		const weaUrl = composeUrl('WEATHERBIT', location, baseUrls, keys);
		const { data: weatherData } = await fetchData(weaUrl, fetch);
		usersResource.weather = weatherData;
	} else {
		// logic get lat and lon;
		const { lng: lon, lat } = correctMatch[0];
		const weaUrl = composeUrl('WEATHERBIT', { lon, lat }, baseUrls, keys);
		const { data: weatherData } = await fetchData(weaUrl, fetch);
		usersResource.weather = weatherData;
	}
	const pictureUrl = composeUrl('PIXABAY', location, baseUrls, keys);
	const { data: pictureData } = await fetchData(pictureUrl, fetch);
	usersResource.pictures = formatToStringArray(
		pictureData.hits,
		'webformatURL'
	);
	uiManager('STOP_SPINNER', spinnerEle);
	window.location.href = '/trip';
};

const saveTripHandler = () => {};

export { getTripHandler, saveTripHandler };
