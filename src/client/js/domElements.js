const locationEle = document.querySelector('input[name=location]');
const dateEle = document.querySelector('input[name=date]');
const spinnerEle = document.querySelector('.spinner');
const errorEle = document.querySelector('span.error');

// action buttons
const tripFormEle = document.querySelector('form');
const getTripBtn = document.querySelector('input[type=submit]');
const saveTripBtn = document.querySelector('button.save-trip');

export {
	locationEle,
	dateEle,
	tripFormEle,
	getTripBtn,
	saveTripBtn,
	spinnerEle,
	errorEle
};
