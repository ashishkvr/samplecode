import {
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
const {height, width} = Dimensions.get('window');
var styles = StyleSheet.create({
  bodyContainer: {
    height: height/1.18,
  },
  responsiveContainer: {
    flex: 1,
    paddingBottom: 100,
    paddingTop: 30
  },
  cardsContainer: {
    flex: 1,
  },
  textLabel: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    position: 'absolute',
    top: height/4
  },
  textStyle: {
    color: '#fff',
    fontSize: 15
  },
  cardResizeContainer: {
    flex: 1,
    position: 'absolute',
    top: 30,
    left: 36,
    bottom: 25, 
    right: 36,
    backgroundColor: 'transparent',
    borderRadius:10,
  },
  cardContainer: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'flex-end'
  },
  card: {
    position: 'relative',
    borderColor: 'white',
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 8,  
    shadowRadius: 2,
    shadowOffset: {
    height: 1,
    width: 0,
    }
  },
  cardImageTextContainer: {
    position: 'absolute',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 0,
    opacity: 0,
  },
  cardImageYupContainer : {
    top: 40,
    left: 40,
    transform:[{rotate: '-20deg'}],
    borderColor:'green',
    borderWidth:5
  },
  cardImageNopeContainer : {
    top: 40,
    right: 40,
    transform:[{rotate: '20deg'}],
    borderColor: 'red',
    borderWidth:5
  },
  cardImageText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  cardImageNopeText: {
    color: 'red',
    backgroundColor: 'rgba(0,0,0,0)', 
  },
  cardImageYupText: {
    color: 'green',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  name: {
    fontWeight: 'bold',
    color: '#696969',
    fontSize: 14,
  },
  cardLabel:{
    padding: 10,
    paddingBottom: 13,
    backgroundColor:'white',
    borderRadius:8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardLabel1: {
    height: 40,
    backgroundColor: 'white'
  },
  place:{
    color:'#d3d3d3',
    fontWeight:'bold'
  },
  value: {
    backgroundColor: 'transparent',
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#d3d3d3',
    fontSize:14
  },
  icon: {
    flexDirection:'row',

  },
  iconImage:{
    height:15,
    width:15,
  },
  buttonsContainer: {
    height:90,
    position: 'absolute',
    bottom: 35,
    left: 0,
    right: 0,
    width:width/2,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:width/4.2,
    justifyContent:'space-between',
  },
  buttonContainer: {
    flex: 1,
    backgroundColor:'red',
    alignItems: 'center',
  },
  button: {
    borderWidth: 2,
    padding: 8,
    borderRadius: 5,
  },
  buttonNope: {
    borderColor: 'red',
  },
  buttonYup: {
    borderColor: 'green',
  },
  cardImage:{
    height: height/2.1,
    alignSelf: 'center',
    width: width/1.4,
    marginLeft: 11,
    marginRight: 11,
  },
  yupText: {
    fontSize: 20,
    color: 'green',
  },
  nopeText: {
    fontSize: 20,
    color: 'red',
  },
  likeButton: {
    height:60,
    width:60,
    borderRadius:30,
  },
  disLikeButton: {
    height:60,
    width:60,
    borderRadius:30,
  }
});

module.exports = styles;