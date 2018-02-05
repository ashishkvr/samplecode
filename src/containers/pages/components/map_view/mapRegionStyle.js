import {
	StyleSheet,
	Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	mapView: {
		width: width,
		height: width/2,
		alignSelf: 'center'
	},
	map:{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center'
	},
	pointerStyle: {
		height: 30,
		width: 30
	}
});
module.exports = styles;