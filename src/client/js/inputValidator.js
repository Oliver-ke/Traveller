const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/;

export default (text) => {
	if (!text) {
		return { error: 'No value inputed', formatted: null };
	}
	const match = text.match(urlRegex);
	if (match) {
		// remove the url from the text
		text = text.replace(urlRegex, '');
		return { error: null, formatted: { url: match[0], text } };
	}
	return { error: null, formatted: { text } };
};
