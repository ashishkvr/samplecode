import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Image
} from 'react-native';
import * as Constant from '../../../utils/const';
import CommonHelper from '../../../utils/helper';
import styles from './listBarStyle';
import TierPricing from '../common_component/tierPricing'

const {height, width} = Dimensions.get('window');

export default class ListBar extends Component {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
		let {image, venue, object} = this.props
		let places_desc = venue.categories.length ? venue.categories[0].name : ''
		let tier = object.price != undefined ? object.price.tier : 0
    let rating = object.rating ? object.rating : ''
    return (
        <View style={styles.mainView}>
          <TouchableOpacity onPress={this.props.nextPage}>
            <Image source={{uri : image}} style={styles.imageView}/>
            <View style={styles.textView}>
                <View>
                  <Text style={styles.leftTextView}>{venue.name}</Text>
                  <Text style={styles.titleTextView}>{CommonHelper._getTruncatedVenue(places_desc)}</Text>
                </View>
                <View>
                  <Text style={styles.rightTextView}>{rating}{rating ? '/10' : null}</Text>
                  <TierPricing  price = {tier} />
                </View>
            </View>
          </TouchableOpacity>
        </View>
      );
  }
}
