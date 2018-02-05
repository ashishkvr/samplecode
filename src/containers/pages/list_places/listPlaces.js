import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Image,
  ListView
} from 'react-native';
import * as Constant from '../../utils/const';
import ListBar from '../components/list_bar/listBar';
import NavigationBar from '../components/navigationBar/navigationBar';
import styles from './listPlacesStyle';

export default class ListPlaces extends Component {

  static navigationOptions = {
    headerMode: 'none',
    header: null,
    gesturesEnabled: false
  }

  constructor(props){
    super(props);
    this.state = {
      likePhotos: this.props.navigation.state.params.likedPlaces,
      lat: this.props.navigation.state.params.lat,
      long: this.props.navigation.state.params.long,
      navigate: this.props.navigation.navigate
    }
    this._onDescription=this._onDescription.bind(this)
  }

  _onDescription(places) {
    this.state.navigate('placeDetails',
      {
        ...places,
        lat : this.state.lat,
        long : this.state.long
      });
  }

  render() {
   const {navigate} = this.props.navigation;
   if(this.state.likePhotos != null) {
        console.log("list: "+JSON.stringify(this.state.likePhotos))
        
      var _listView = this.state.likePhotos.map((places, index) => {
        return(
            <ListBar key={index} {...places} nextPage={()=>{this._onDescription(places)}}/>
        )
      })
   }
    return (
        <View style={styles.container}>
          <NavigationBar text= {Constant.MYPLACES_TXT} image={Constant.IMAGE_BACK} leftText={Constant.ZURUCK_TXT} _onBackPress={ () => this.props.navigation.goBack(null) }/>
          <ScrollView>
            <View style={styles.listContainer}>
              {_listView}
            </View>
          </ScrollView>
        </View>
    );
  }
}
