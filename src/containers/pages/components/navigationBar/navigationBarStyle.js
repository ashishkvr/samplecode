import {
	StyleSheet,
	Dimensions,
  Platform
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#adb9ff',
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: "row",
    padding:10,
    justifyContent:'space-between',
    width:width,
  },
  titleView: {
  	flexDirection: "row",
  	justifyContent: "space-between",
    width: width/5.5,
  },
  leftButton: {
    flexDirection:'row',
  },
  textView: {
    alignSelf:'center',
    alignItems:'center',
    fontSize: 17,
    color: '#FFF',
    fontWeight:'bold'
  },
  leftTextView: {
  	fontSize: 17,
    color: '#FFF',
  },
  backButton:{
    ...Platform.select({
      ios: {
        marginLeft: -5,
      },
      android: {
        marginLeft: 0,
      },
  }),
  marginRight:4,
  bottom:1,
  },
  rightText:{
    width:width/5.5,
    alignItems: 'center'
  },
  galleryStyle: {
    width : 35,
    height: 25
  }
});
module.exports = styles;