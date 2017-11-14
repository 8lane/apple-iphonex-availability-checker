const proxyquire = require('proxyquire');
const request = require('request');
const handleResponse = require('./Helper.js');

describe('When checking for iPhone X pick up with no post code', () => {
	let sut;

	beforeEach(() => {
		sut = proxyquire('./Scraper.js', { './Config.js': { location: '' } });
	});

	it('should error if a post code is not entered', () => {
		expect(() => sut()).toThrow('Post code must be entered!');
	});
});


describe('When iPhone X pick up is not available', () => {
	let sut;

	const invalidResponse = {
		body: {
			stores: [{
				partsAvailability: {
					"MQAF2B/A": {
						storeSelectionEnabled: false
					}
				}
			}]
		}
	}

	beforeEach(() => {
		spyOn(console, 'log');
		spyOn(request, 'get');

		sut = proxyquire('./Scraper.js', {
			'./Config.js': { apiUrl: 'appleUrl', location: 'andMyPostCode', timerInterval: '1000' }
		});

		sut();
	});

	it('should make a request to apple', () => {
		expect(request.get).toHaveBeenCalled();
	});

	it('should output a message in the console', () => {
		handleResponse(invalidResponse);
		expect(console.log).toHaveBeenCalledWith('No iPhone X devices available');
	});
});


describe('When iPhone X pick up is available', () => {

});

