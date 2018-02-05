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
import styles from './navigationBarStyle';

export default class NavigationBar extends Component {

  static navigationOptions = {
    headerMode: 'none',
    header: null,
  }

  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
        <View style={styles.headerView}>
            <View style={styles.titleView}>
                <TouchableOpacity onPress={this.props._onBackPress} style={styles.leftButton}>
                    <Image style={styles.backButton} source={this.props.image}/>
                <Text style={styles.leftTextView}>{this.props.leftText}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.middleTextView}>
               <Text style={styles.textView}>{this.props.text}</Text>
            </View>
            <TouchableOpacity onPress = {this.props.buttonClicked}>
                <View style={styles.rightText}>
                    <Image style={styles.galleryStyle} source={this.props.rightView} />
                </View>
            </TouchableOpacity>
        </View>
      );
  }
}

