import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import styles from './mapRegionStyle';
import MapView from 'react-native-maps';
import * as Constant from '../../../utils/const';

export default class MapRegion extends Component {

  static navigationOptions = {
    headerMode: 'none',
    header: null,
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
  	let { lat, long } = this.props;
    return (
        <TouchableOpacity style={styles.mapView} onPress={this.props.mapRedirect}>
            <MapView
              style={styles.map}
              zoomEnabled={false}
              scrollEnabled={false}
              initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: Constant.latitude_Delta,
              longitudeDelta: Constant.longitude_Delta,
          	}}>
                  <MapView.Marker
                  coordinate={{
                    latitude: lat,
                    longitude: long,
                  }}>
                      <View>
                        <Image style={styles.pointerStyle} source={Constant.IMAGE_POINTER}/>
                      </View>
                  </MapView.Marker>
            </MapView>
        </TouchableOpacity>
      );
  }
}