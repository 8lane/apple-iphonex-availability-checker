module.exports = response => {
	const availableStores = response.body.stores.filter(
		store => store.partsAvailability["MQAF2B/A"].storeSelectionEnabled
	);
	
	if (availableStores.length === 0) {
		return console.log('\x1b[31m', 'No iPhone X devices available');
	} else {
		return console.log('\x1b[32m', 'iPhone X Available!!');		
	}
};