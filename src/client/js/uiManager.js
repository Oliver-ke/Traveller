const uiManager = (action, element, data = null) => {
	switch (action) {
		case 'START_SPINNER': {
			element.classList.add('show-spinner');
			return;
		}
		case 'STOP_SPINNER': {
			element.classList.remove('show-spinner');
			return;
		}
		case 'SHOW_ERROR': {
			element.classList.add('show-error');
			element.textContent = data;
			return;
		}
		case 'CLEAR_ERROR': {
			return element.classList.remove('show-error');
		}
		case 'SHOW_RESULT': {
			const {} = data;
			element.innerHTML = ``;
			return;
		}
		default:
			return;
	}
};

export default uiManager;
