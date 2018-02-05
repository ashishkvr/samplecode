import {
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        borderWidth: 0,
        alignSelf: 'center',
      },
      android: {
      },
    }),
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
  imageView: {
    height: 80,
    width: 80,
    ...Platform.select({
      ios: {
        bottom:30,
      },
      android: {
        bottom:0,
      },
    }),
  },
  centering: {
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
    top: height/2.8
  },
  barcodeView: {
    bottom: 0,
    alignSelf: 'center'
  },
  barcodeBound: {
    position:'absolute',
    top:height/4
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

module.exports = styles;