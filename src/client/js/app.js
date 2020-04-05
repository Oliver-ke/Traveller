// This file mostly puts all the moving parts together
import {
	locationEle,
	dateEle,
	spinnerEle,
	errorEle,
	landingSection,
	tripSection,
	locationImg,
	countryInfoEle,
	weatherInfoEle,
	savedTripSection,
	savedTripItemEle
} from './domElements';

import { fetchData } from './fetchData';
import composeUrl from './composeUrl';
import { baseUrls, keys } from './credentials';
import { isDataValid, formatToStringArray } from './utils';
import uiManager from './uiManager';

// holds app data
const usersResource = {
	coordinate: {},
	weather: [],
	countryInfo: {},
	pictures: [],
	input: {}
};

// fires on get trip request
const getTripHandler = async (e) => {
	e.preventDefault();
	const location = locationEle.value;
	const date = dateEle.value;

	if (!location || !date) {
		return uiManager('SHOW_ERROR', errorEle, 'Provide a location and date');
	}
	const { error: dateError, days } = isDataValid(date);
	if (dateError) {
		return uiManager('SHOW_ERROR', errorEle, dateError);
	}

	usersResource.input = { location, date, days };

	uiManager('CLEAR_ERROR', errorEle);
	uiManager('START_SPINNER', spinnerEle);

	const geoUrl = composeUrl('GEONAMES', location, baseUrls, keys);
	const { error, data } = await fetchData(geoUrl, fetch);

	if (error || !data.geonames[0]) {
		uiManager('STOP_SPINNER', spinnerEle);
		return uiManager('SHOW_ERROR', errorEle, 'Could not find Location');
	}
	const { lng: lon, lat, countryName } = data.geonames[0];
	usersResource.coordinate = { lon, lat };
	const weaUrl = composeUrl('WEATHERBIT', { lon, lat, days }, baseUrls, keys);
	const { data: weatherData } = await fetchData(weaUrl, fetch);
	usersResource.weather = weatherData.data;

	// get countres info
	const restCountryUrl = composeUrl('RESTCOUNTRY', countryName, baseUrls);
	const { data: countryInfo, error: countryError } = await fetchData(
		restCountryUrl,
		fetch
	);
	if (countryError) {
		uiManager('STOP_SPINNER', spinnerEle);
		return uiManager(
			'SHOW_ERROR',
			errorEle,
			'Could not get location country'
		);
	}
	usersResource.countryInfo = countryInfo[0];

	// get trip pictures
	const pictureUrl = composeUrl('PIXABAY', countryName, baseUrls, keys);
	const { data: pictureData } = await fetchData(pictureUrl, fetch);
	usersResource.pictures = formatToStringArray(
		pictureData.hits,
		'webformatURL'
	);

	// update DOM
	uiManager('BUILD_TRIP_IMG', locationImg, usersResource.pictures);
	uiManager('BUILD_COUNTRY_INFO', countryInfoEle, usersResource.countryInfo);
	uiManager('BUILD_WEATHER_FIELDS', weatherInfoEle, usersResource.weather);
	uiManager('STOP_SPINNER', spinnerEle);
	uiManager('HIDE_LANDING', landingSection);
	uiManager('SHOW_TRIP', tripSection);
};

// fires on save trip click
const saveTripHandler = (e) => {
	const exitingItems = JSON.parse(localStorage.getItem('trips'));
	if (exitingItems === null || exitingItems.length < 1) {
		const newItem = JSON.stringify([ usersResource ]);
		localStorage.setItem('trips', newItem);
		return alert('Trip saved Successfully');
	}
	// check for duplicate
	const lastItem = exitingItems[exitingItems.length - 1];
	if (lastItem.input.location == usersResource.input.location) {
		return alert('Trip already saved');
	}
	const payload = JSON.stringify([ ...exitingItems, usersResource ]);
	localStorage.setItem('trips', payload);
	return alert('Trip saved Successfully');
};

const checkNewTripHandler = () => {
	return uiManager('SWITCH_SECTION_TO');
};

// fires on view saved trip clicked
const viewSavedTripHandler = () => {
	const data = JSON.parse(localStorage.getItem('trips'));
	if (data === null) {
		return alert('You have no saved trips yet, save a trip');
	}
	uiManager('BUILD_SAVED_TRIP', savedTripItemEle, data);
	uiManager('HIDE_TRIP', tripSection);
	uiManager('HIDE_LANDING', landingSection);
	uiManager('SHOW_SAVED_TRIP', savedTripSection);
};

// handles delete saved trip
const handleDeleteSavedTrip = (e) => {
	const item = e.target.getAttribute('data');
	const data = JSON.parse(localStorage.getItem('trips'));
	const update = data.filter((trip) => trip.input.location !== item);
	localStorage.setItem('trips', JSON.stringify(update));
	uiManager('BUILD_SAVED_TRIP', savedTripItemEle, update);
};

export {
	getTripHandler,
	saveTripHandler,
	checkNewTripHandler,
	viewSavedTripHandler,
	handleDeleteSavedTrip
};
