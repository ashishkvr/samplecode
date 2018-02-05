import {
  StyleSheet,
  Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	imageContainer: {
		flex:1,
	},
	logo:{
		height:35,
		width:35,
	},
	textCategory: {
		fontWeight: 'bold',
		color: '#d3d3d3'
	},
	background: {
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		margin: 10,
		marginBottom: 0
	},
	collapse: {
		position: 'absolute',
		top: 25,
		right: 10
	},
	descView: {
		alignSelf: 'center',
		alignItems: 'center'
	},
	viewBox: {
		width: width/1.4,
		alignSelf: 'center',
	},
	placeName: {
		fontSize: 18,
		fontWeight: '600',
		color: '#696969'
	},
	ratingStyle: {
		color: '#d3d3d3',
		fontWeight: 'bold'
	},
	icon: {
		flexDirection:'row',
	},
	iconImage:{
		height:15,
		width:15,
	},
	imageView : {
		flex:1,
		alignSelf:'center',
		width: width,
	}
});

module.exports = styles;