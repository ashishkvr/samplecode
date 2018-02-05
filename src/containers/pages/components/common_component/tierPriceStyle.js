import {
	StyleSheet,
	Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
	icon: {
    flexDirection:'row',
    justifyContent: 'flex-end'
  },
  iconImage:{
    height:15,
    width:15,
  }
});
module.exports = styles;