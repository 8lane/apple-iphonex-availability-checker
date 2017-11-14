module.exports = response => {
	let availableStores = [];
	
	if (response.body.stores) {
		availableStores = response.body.stores.filter(
			store => store.partsAvailability["MQAF2B/A"].storeSelectionEnabled
		);
	}
	
	if (availableStores.length === 0) {
		return console.log('\x1b[31m', 'No iPhone X devices available');
	} else {
		return console.log('\x1b[32m', 'iPhone X Available!!');		
	}
};