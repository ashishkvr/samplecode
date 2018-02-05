import {
	StyleSheet,
	Dimensions,
  Platform
} from 'react-native';

const windowMarginTop = (Platform.OS === 'ios') ? 24 : 0;
const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  viewPortContainer: {
    marginTop: windowMarginTop,
    flex: 1,
  },
  imageView: {
    width: width,
    height: height/0.89
   }, 
  dislikeView: {
    position: 'absolute',
    bottom: width/3,
    right: width/1.65
  },
  barcode:{
    height:25,
    width:25
  },
  survey:{
    height:25,
    width:30,
  },
  likeView: {
    position: 'absolute',
    bottom: width/3,
    right: width/3.6
  },
  header: {
    margin: 15,
    marginTop: 30,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#ADFF2F'
  },
  textHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  listCard: {
    position: 'absolute',
    bottom: 90,
    right: 10,
  },
   infoView: {
    position: 'absolute',
    bottom: 90,
    left: 10,
  },
 refreshView: {
    position: 'absolute',
    bottom: 90,
    left: 10,
  },
  centering: {
    position: 'absolute',
    top: height/2.4,
    right: width/2.3,
  },
  infoBarButton: {
    ...Platform.select({
      ios: {
        bottom: 15
      },
      android: {
        bottom: 15
      },
    }),
  },
  listBarButton: {
    ...Platform.select({
      ios: {
        bottom: 15
      },
      android: {
        bottom: 15
      },
    }),
  },
  listCardImage: {
    height:30,
    width:30
  },
refreshImage: {
    height:50,
    width:50,
    borderRadius:25,
  },
  middleView: {
    marginTop: 20,
    alignItems: 'center'
  },
  middleBackground: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: width/1.3,
    height: height/1.68
  },
  centerView: {
    alignSelf: 'center',
    width: width/1.4,
    height: height/2.2
  },
  lowerBackground: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textView: {
    fontSize: 18
  },
  coinView: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textHeader: {
    color: '#fff',
    fontSize: 18,
    fontWeight:'bold',
    backgroundColor: 'transparent'
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    color: '#ADFF2F',
    backgroundColor: 'transparent'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  done: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
    backgroundColor: "transparent"
  },
  buttonView: {
     marginTop:width/1.05,
     marginLeft:width/4,
     alignItems: "center",
     flexDirection:'row',
  },
  likeButton:{
     marginLeft:width/5,
  },
  imageSwip:{
    height:height/2,
    width:width/2,
  }
});

module.exports = styles;