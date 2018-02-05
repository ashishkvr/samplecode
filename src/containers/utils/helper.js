
module.exports = {
	//get images URL for card view
	_getUrl(_data) {
     return _data.prefix + 500 +'x'+ 500 + _data.suffix;
	},
	//get current date in DDMMYYYY format
	_getDate() {
	    
	    var date = new Date();
	    var rDate = " "+ date.getFullYear() + this._getMonth() + this._getCurrentDate()
		return rDate;
	},
	//get current month
	_getMonth() {
	    var date = new Date();
		return date.getMonth()+1 <10 ? '0' + (date.getMonth()+1) : date.getMonth()+1
	},
	//get current date
	_getCurrentDate() {
	    var date = new Date();
		return date.getDate()<10 ? '0' + date.getDate() : date.getDate()
	},
	//return trucated string with ...
	_getTruncatedVenue(venueString) {
		return venueString.length < 28 ? venueString : venueString.substring(0,27) + '...'
	},
	//shows the alert
	_commonAlert(Alert, txt, self) {
		Alert.alert('', txt, [{text: 'OK', onPress: () => self.props.navigation.goBack(null) },], {cancelable: false})
	},

	//generates uuid's
	_getUid(uuid) {
		return uuid.v4()
	}
}