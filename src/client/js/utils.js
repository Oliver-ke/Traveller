const isDataValid = (date) => {
	const currentDate = new Date();
	const providedDate = new Date(date);
	if (providedDate < currentDate) {
		return { error: 'Date is behind', days: null };
	}
	const timeDifference = providedDate.getTime() - currentDate.getTime();
	const dayDifference = Math.round(timeDifference / (1000 * 3600 * 24));
	if (dayDifference > 16) {
		return { error: 'Can only get forcast for 16 days max', days: null };
	}
	return { error: null, days: dayDifference };
};

const formatToStringArray = (objectArray, key) => {
	const formated = objectArray.map((object) => object[key]);
	return formated;
};

export { isDataValid, formatToStringArray };
