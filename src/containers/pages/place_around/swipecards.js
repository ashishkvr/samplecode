'use strict';
import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, TouchableOpacity,PanResponder, Image, TouchableHighlight} from 'react-native';
import * as Constant from '../../utils/const';
import CommonHelper from '../../utils/helper';
import clamp from 'clamp';
import Dimensions from 'Dimensions';
import styles from './swipecardStyle';
import TierPricing from '../components/common_component/tierPricing'
import AntaviSense from '../../utils/antavisense';

const {height, width} = Dimensions.get('window');

class Card extends Component {

  constructor(props){
    super(props);
    this.state = {
    };
  }

  render() {
    this.props.cardObject(this.props)
    let {image, object, venue} = this.props
    console.log("currentImage"+ image)
    console.log("currentvenue"+ JSON.stringify(venue))
    console.log("currentobject"+ JSON.stringify(object))
    return (
        <Animated.View style={[styles.cardContainer, this.props.animatedCardContainerStyles]}>
          {this.props.currentPosition<this.props.cards.length?
          <Animated.View style={[styles.card, this.props.animatedCardStyles]} {...this.props.panResponder}>
          <TouchableOpacity activeOpacity={1} onPress={this.props.placeView}>
            <Image source={{uri: image}} style={styles.cardImage}>
              <Animated.View style={[styles.cardImageTextContainer, styles.cardImageYupContainer, this.props.animatedYupStyles]}>
                <Text style={[styles.cardImageText, styles.cardImageYupText]}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.cardImageTextContainer, styles.cardImageNopeContainer, this.props.animatedNopeStyles]}>
                <Text style={[styles.cardImageText, styles.cardImageNopeText]}>NOPE</Text>
              </Animated.View>
            </Image>
            {image?
              <View style={styles.cardLabel}>
                <View style={styles.cardLabel1}>
                    <Text style={styles.name}>{CommonHelper._getTruncatedVenue(venue.name)}</Text>
                    <Text style={styles.place}>{CommonHelper._getTruncatedVenue(venue.categories.length ? venue.categories[0].name : '')}</Text>
                </View>
                <View style={styles.cardLabel1}>
                    <Text style={styles.value}>{object.rating}{object.rating ? '/10' : null}</Text>
                    <TierPricing price = {object.price != undefined ? object.price.tier : 0} />
                </View>
              </View>:null}
           </TouchableOpacity>
          </Animated.View>:
          <View style={styles.textLabel}>
            <Text style={styles.textStyle}>{Constant.CARD_EMPTY_TXT}</Text>
          </View>}
        </Animated.View>
    );
  }
}

class SwipeCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
      cards: this.props.places,
      currentPosition: 0,
      loading: true
    }
  }

  // we use a circular queue
  _goToNextPerson() {
    if(this.state.currentPosition<this.state.cards.length) {
    this.setState({currentPosition: this.state.currentPosition + 1});
    }

  }

  componentDidMount() {
    this._animateEntrance();
  }

  _animateEntrance() {
    // Animated.timing(this.state.nextCardOpacity, {
    //          toValue: 1,
    //    }).start()
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      onPanResponderGrant: (e, gestureState) => {

        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),

      onPanResponderRelease: (e, {vx, vy}) => {
        let { cards, currentPosition} = this.state;
        this.state.pan.flattenOffset();
        var velocity;
        let venueDocument = cards[currentPosition];

        if (vx > 0) {
          if(currentPosition<cards.length && Math.abs(this.state.pan.x._value) > Constant.SWIPE_THRESHOLD){
            this.props.likedPosition(currentPosition)
            AntaviSense.insertCustomData("placeLike",this.minimizeVenueDocument(venueDocument.venue))
          }
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          if(Math.abs(this.state.pan.x._value) > Constant.SWIPE_THRESHOLD) {
            AntaviSense.insertCustomData("placeDislike",this.minimizeVenueDocument(venueDocument.venue))
          }
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this.state.pan.x._value) > Constant.SWIPE_THRESHOLD) {
          Animated.decay(this.state.pan, {
            velocity: {x: velocity, y: vy},
            deceleration: 0.99
          }).start(this._resetState.bind(this))
        } else {
          Animated.spring(this.state.pan, {
            toValue: {x: 0, y: 0},
            friction: 4
          }).start()
        }
      }
    })
  }
  
  minimizeVenueDocument(v) {
    var minVenueDocument = {}
    minVenueDocument.id = v.id
    minVenueDocument.location = v.location
    minVenueDocument.name = v.name
    console.log(minVenueDocument)
    return minVenueDocument
  }

  _resetState() {
    this.state.pan.setValue({x: 0, y: 0});
    this._goToNextPerson();
  }

  handleNopePress() {
     let { cards, currentPosition} = this.state;
     let venueDocument = cards[currentPosition]
     if(currentPosition < cards.length){
       AntaviSense.insertCustomData("placeDislike",this.minimizeVenueDocument(venueDocument))
     }
      let screenwidth = Dimensions.get('window').width;
      let panlength = screenwidth + 100
      Animated.timing(this.state.pan, {
            toValue: {x: -panlength, y: 0}
      }).start(this._resetState.bind(this))
  }

  handleYupPress() {
    let { cards, currentPosition} = this.state;
    let venueDocument = cards[currentPosition]
    if(currentPosition < cards.length){
      this.props.likedPosition(currentPosition)
      AntaviSense.insertCustomData("placeLike",this.minimizeVenueDocument(venueDocument))
    }
      let screenwidth = Dimensions.get('window').width;
      let panlength = screenwidth + 100

      Animated.timing(this.state.pan, {
            toValue: {x: panlength, y: 0}
      }).start(this._resetState.bind(this))
  }

  render() {
    let { pan, cards, currentPosition} = this.state;

    let [translateX, translateY] = [pan.x, pan.y];

    // card 0 animation
    let rotate = pan.x.interpolate({inputRange: [-240, 0, 240], outputRange: ["-30deg", "0deg", "30deg"]});

    let animatedCardStyles = {transform: [{translateX}, {translateY}, {rotate}]};

    let yupOpacity = pan.x.interpolate({inputRange: [0, Constant.SWIPE_THRESHOLD], outputRange: [0, 1], extrapolate: 'clamp'});
    let animatedYupStyles = {opacity: yupOpacity}

    let nopeOpacity = pan.x.interpolate({inputRange: [-Constant.SWIPE_THRESHOLD, 0], outputRange: [1, 0], extrapolate: 'clamp'});
    let animatedNopeStyles = {opacity: nopeOpacity}

    let card0AnimatedStyles = {
      animatedCardStyles: animatedCardStyles,
      animatedNopeStyles: animatedNopeStyles,
      animatedYupStyles: animatedYupStyles
    }

    let card2AnimatedStyles = {
    }

    let card3AnimatedStyles = {
    }

    let person0 = cards[currentPosition]
    let person1 = cards[(currentPosition+1)]

    return (
      <View style={styles.bodyContainer}>
        <View style={styles.responsiveContainer}>
          <View style={styles.buttonsContainer}>
              <TouchableOpacity activeOpacity={this.state.currentPosition < this.state.cards.length ? 0.3 : 1} onPress={() => {this.handleNopePress()}}>
                <Image source={Constant.IMAGE_DISLIKE} style={styles.disLikeButton}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={this.state.currentPosition < this.state.cards.length ? 0.3 : 1} onPress={() => {this.handleYupPress()}} >
                <Image source={Constant.IMAGE_LIKE} style={styles.likeButton}/>
              </TouchableOpacity>
          </View>
          <View style={styles.cardsContainer}>
            {this.state.currentPosition != this.state.cards.length-1 ?
              <Card {...person1} {...card3AnimatedStyles} currentPosition={this.state.currentPosition} cards={this.state.cards} placeView={this.props.onDescription} cardObject={(obj) => this.props.receiveCardData(obj)}/>:null
            }
            <Card {...person0} {...card0AnimatedStyles} panResponder={this._panResponder.panHandlers} currentPosition={this.state.currentPosition} cards={this.state.cards} placeView={this.props.onDescription} cardObject={(obj) => this.props.receiveCardData(obj)}/>
          </View>
        </View>
      </View>
    );
  }
}

module.exports = SwipeCards