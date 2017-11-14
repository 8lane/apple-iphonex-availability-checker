const request = require('request');
const config = require('./Config.js');
const handleResponse = require('./Helper.js');

module.exports = () => {
	if (!config.location || config.location === '') {
		throw new Error('Post code must be entered!');
	}

	let polling = false;

	const checkApple = () => {
		if (!polling) {
			polling = true;
			
			request.get(config.apiUrl + config.location, { json: true }, (error, response) => {
				if (!handleResponse(response.body)) {
					setTimeout(() => {
						polling = false;
						checkApple();
					}, config.timerInterval);
				}
			});
		}
	}

	checkApple();
	setTimeout(() => checkApple(), config.timerInterval);	
}