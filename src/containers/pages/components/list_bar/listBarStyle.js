import {
	StyleSheet,
	Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
	mainView: {
		margin: 5,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 2,
		marginBottom: 0,
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor:"#fff",
		borderColor: "#a9a9a9",
	},
	imageView: {
		flex:1,
		height: width/4
	},
	textView: {
		flexDirection:'row',
		justifyContent:'space-between',
		marginTop: 5,
		marginBottom: 5
	},
	leftTextView: {
		fontSize: 17,
		fontWeight: "400",
		flexWrap: 'wrap',
		width: width/1.5
	},
	titleTextView: {
		color: "#a9a9a9",
		fontSize: 14
	},
	rightTextView: {
		fontSize: 19,
		color: "#c0c0c0",
		fontWeight: "300"
	},
	iconImage:{
		height:15,
		width:15,
	},
	icon: {
		flexDirection:'row',
		paddingLeft:10
	},
});

module.exports = styles;