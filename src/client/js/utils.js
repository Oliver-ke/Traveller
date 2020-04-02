const filterUtil = (array, key, value) => {
	const matches = array.filter((item) => item[key] == value);
	return matches;
};

const formatToStringArray = (objectArray, key) => {
	const formated = objectArray.map((object) => object[key]);
	return formated;
};

export { filterUtil, formatToStringArray };
