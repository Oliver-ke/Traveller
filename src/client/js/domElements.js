const locationEle = document.querySelector('input[name=location]');
const dateEle = document.querySelector('input[name=date]');
const spinnerEle = document.querySelector('.spinner');
const errorEle = document.querySelector('span.error');

// page scope element, this is used to control page content.
const landingSection = document.querySelector('section.landing');
const tripSection = document.querySelector('section.trip');
const savedTripSection = document.querySelector('section.saved-trips');
// trip
const locationImg = document.querySelector('.location-img');
const countryInfoEle = document.querySelector('.country-info');
const weatherInfoEle = document.querySelector('.weather-info');
const savedTripItemEle = document.querySelector('.trip-items');

// action buttons
const tripFormEle = document.querySelector('form');
const getTripBtn = document.querySelector('input[type=submit]');
const saveTripBtn = document.querySelector('button.save-trip');
const newTripBtn = document.querySelector('button.new-trip');
const viewSavedTrips = document.querySelector('.view-trip');
const newTripOnSaved = document.querySelector('.new-trip-onsaved');

export {
	locationEle,
	dateEle,
	tripFormEle,
	getTripBtn,
	saveTripBtn,
	spinnerEle,
	errorEle,
	landingSection,
	tripSection,
	locationImg,
	countryInfoEle,
	weatherInfoEle,
	newTripBtn,
	viewSavedTrips,
	savedTripSection,
	savedTripItemEle,
	newTripOnSaved
};
