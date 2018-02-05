import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
  View,
  Image,
  Linking,
  AppState
} from 'react-native';
import * as Constant from '../../utils/const';
import styles from './placeDetailsStyle'
import CommonHelper from '../../utils/helper'
import TierPricing from '../components/common_component/tierPricing'
import MapRegion from '../components/map_view/mapRegionView'

export default class PlaceAround extends Component {

	static navigationOptions = {
    headerMode: 'none',
    header: null,
    gesturesEnabled: false
  }

	constructor(props) {
		super(props);
    let description = this.props.navigation.state.params;
		this.state = {
      details: description,
      lat: description.lat,
      long: description.long,
      appState: AppState.currentState
		}
    this._onMapRedirect = this._onMapRedirect.bind(this);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
	}

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  _onMapRedirect() {
      let { venue } = this.state.details
      let {lat, long} = this.state
      let latitude = venue.location.lat
      let longitude = venue.location.lng
      if(Platform.OS == 'ios') {
        this.openMapURL(Constant.IOS_MAP+'?saddr='+lat+','+long+'&daddr='+latitude+','+longitude)
      }
      else {
        this.openMapURL(Constant.ANDROID_MAP+'?saddr='+lat+','+long+'&daddr='+latitude+','+longitude)
      }
  }

  openMapURL(url) {
    Linking.canOpenURL(url).then(supported => {
          if (supported) {
              Linking.openURL(url);
          } else {
              console.log('Don\'t know how to go');
          }
      }).catch(err => console.error('An error occurred', err));
  }

  render() {
    let {image, venue, object} = this.state.details
    let places_desc = venue.categories.length ? venue.categories[0].name : ''
    let rating = object.rating ? object.rating : ''
    let tier = object.price != undefined ? object.price.tier : 0
    let latitude = venue.location.lat
    let longitude = venue.location.lng
    let name = venue.name
    let phrase = object.phrases ? object.phrases[0].sample.text: '';
    let description = object.description ? object.description: '';
    let quotes = '"'+phrase+ '"'
    return (
      <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.imageView} source={{uri: image}} resizeMode = 'cover'>
                <TouchableOpacity style={styles.collapse} onPress={ () => this.props.navigation.goBack(null) }>
                  <Image style={styles.logo} source={Constant.IMAGE_COLLAPSE}/>
                </TouchableOpacity>
            </Image>
          </View>
          <View style={styles.background}>
              <View>
                  <Text style={styles.placeName}>{CommonHelper._getTruncatedVenue(name)}</Text>
                  <Text style={styles.textCategory}>{CommonHelper._getTruncatedVenue(places_desc)}</Text>
              </View>
              <View>
                  <Text style={styles.ratingStyle}>{rating}{rating ? '/10' : null}</Text>
                  <TierPricing price = {tier} />
              </View>
          </View>
          <ScrollView style={{paddingTop:10}}>
              <MapRegion lat = {latitude} long = {longitude} mapRedirect = {this._onMapRedirect} />
              <View style={styles.viewBox}>
                  <Text style={styles.descView}>{phrase ? quotes : null}</Text>
              </View>
              <Text style={{margin: 20}}>{description}</Text>
          </ScrollView>
      </View>
    );
  }
}

