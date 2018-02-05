import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import styles from './tierPriceStyle.js';
import * as Constant from '../../../utils/const.js';
export default class TierPricing extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
		let tierPrice = []
		if(this.props.price == 0){
			tierPrice = []
		} else {
			for(var count = 0; count < parseInt(this.props.price); count++ ){
				tierPrice.push(<Image key={count} source={Constant.IMAGE_COIN} style={styles.iconImage}/>)
			}
		}

    return (
      <View style={styles.icon}>
      	{tierPrice.length >0 ? tierPrice : null}
      </View>
    );
  }
}
