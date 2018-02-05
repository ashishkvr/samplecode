import React, { Component } from 'react';
import {
	AsyncStorage,
	AppRegistry,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	View,
	Image,
	Button,
	AppState,
	Platform,
	Alert
} from 'react-native';
//import _ from 'underscore';
import _ from 'lodash';

import PropTypes from 'prop-types';
import * as Constant from '../../utils/const';
import ApiHelper from '../../utils/api';
import AntaviSenseSDK from '../../utils/antavisense';
import * as CommonHelper from '../../utils/helper';
import styles from './placeAroundStyle';
import SwipeCards from './swipecards';
import SplashScreen from 'react-native-splash-screen';
import Permissions from "react-native-permissions";
import * as OptionalSurvey from "../register/forms/optional_survey";
var PushNotification = require('react-native-push-notification');


let object = [];
let myData;
const prefIdMyPlaces = "myPlaces"
const prefIdSeen = "seen"
export default class Tourist extends Component {
	constructor(props){

		super(props);
		this.state = {
			loading: true,
			surveyEnabled: false,
			latitude:'',
			longitude:'',
            country: 'Unknown',
            navigate: this.props.navigation.navigate,
			places: [],
            myPlaces: [],
            seen: [],
			mySurveyDate: ''
		};
		this._onDescription = this._onDescription.bind(this)
		this._onBarcode = this._onBarcode.bind(this)
		this._onRegister = this._onRegister.bind(this)
		this._onListPlaces = this._onListPlaces.bind(this)
		this._onInfo = this._onInfo.bind(this)
		this._onRefresh = this._onRefresh.bind(this)
		this._setPlaces = this._setPlaces.bind(this);
		this._onOptionalSurvey = this._onOptionalSurvey.bind(this);
		this._handleAppStateChange = this._handleAppStateChange.bind(this)
	} 

	static navigationOptions = {
		headerMode: 'none',
		header: null
	}
	

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    
    
    _handleAppStateChange(currentAppState) {
        if (currentAppState == 'active')
            this._setSurveyState();
    }

	componentWillMount() {
	    AntaviSenseSDK.startSensing();
		this._updateLocationAndVenues()
	}
	_onRefresh() {
	    this._updateLocationAndVenues()
	}
	_updateLocationAndVenues() {
	   console.log("there is geolocation?")
	    if(navigator.geolocation) {
	            console.log("there is geolocation")
				navigator.geolocation.getCurrentPosition((position) => {
					var lat = parseFloat(position.coords.latitude)
					var long = parseFloat(position.coords.longitude)
					this.setState({latitude: lat, longitude: long})
					Permissions.check('location')
					.then(response => {
							if(response == 'authorized') {
								this.setState({loading: true})
								AntaviSenseSDK.startSensing();
							}
					});
					if(position){
						AsyncStorage.getItem(prefIdSeen).then((value) => {
						        if (value)
								    this.setState({seen: JSON.parse(value)});
						}).done();
						AsyncStorage.getItem(prefIdMyPlaces).then((value) => {
						        if (value)
								    this.setState({myPlaces: JSON.parse(value)});
						}).done();
						this._fetchVenueData();
					}
				},(error) => {
					CommonHelper._commonAlert(Alert, Constant.LOCATION_PERMISSION_TXT, this)
				},{enableHighAccuracy: true, timeout: 200000});
		} else {
			console.log("geolocation not supported")
		}
	}
    
	_fetchVenueData() {
		let position = this.state;
		ApiHelper._getVenues(position.latitude+Math.random()*0.01, 
		                    position.longitude+Math.random()*0.01)
		    .then((response) => { 
		    
		        // all venues around
			    let venues = response.data.response.venues ? response.data.response.venues : []
                if(venues) {
                    this.setState({country: venues[0].location.country})
                }
                 var unseenPlaces = venues
                    .filter((venue)=>
                    {
                        return !this.state.seen.includes(venue.id)
                    })
                // fetch image and details per venue if not liked already
                const responses = Promise.all(unseenPlaces.map(venue => (this._getMoreInfoByVenue(venue))))
                    .then(responses => {
                        var responsesFiltered = responses.filter(function(venue){
                            return venue.image!=null;
                         });
        			    this.setState({places: responsesFiltered, loading : false});
        			    
		    	    });

		    }).catch(function (error) {
			    console.log(error)
    		});
	}

	_getMoreInfoByVenue(venue) { // get photos
		return ApiHelper._getPlaces(venue.id)
		    .then((response) => {
				var photos = response.data.response.photos.items.length ? response.data.response.photos.items : [];
				return ApiHelper._getVenueDetails(venue.id)
			        .then(response => {
    				    var details = response.data.response.venue;
    				   // if (photos==[])
    				     //   return null;
                        return this._mergePhotosDetailsPerPlace(details, photos, venue);					
        			});
 			})
			.catch(error => console.log(error));
	}

	_mergePhotosDetailsPerPlace(details, photos, venue) {
	    var imageUrls
	    photos.map((value, i) => {
			imageUrls = CommonHelper._getUrl(value)
		})
		var result = {venue:venue, image:imageUrls, object:details}
		return result
	}

	componentDidMount() {
	    AppState.addEventListener('change', this._handleAppStateChange);
        this._setSurveyState();
        this._setBarcodeState();
		SplashScreen.hide();
	}
	

	registerNotification() {
	  AsyncStorage.getItem("remind").then((value) => {
        if (value=='true') {
           PushNotification.cancelAllLocalNotifications();
            var now = new Date();
            var reminder = new Date();
            reminder.setHours(18);
            reminder.setMinutes(0);
            reminder.setSeconds(0);
            if (reminder.getTime() < now) {
                reminder.setTime(reminder.getTime() + 864e5);
            }
		    PushNotification.localNotificationSchedule({
                message: "Erinnerung: Bitte füllen Sie den Fragebogen jetzt aus.", // (required)
                date: reminder,
                repeatType: 'day',
                repeatInterval:'day'
        });
        }
    });
	
	}


	
	
	_onDescription() {
		this.state.navigate('placeDetails',{
				...object,
				lat : this.state.latitude,
				long : this.state.longitude

			});
	}
 
	_onBarcode() {
		this.state.navigate('BarcodeScanner',{
        lat : this.state.latitude,
        long : this.state.longitude
    });
	}

	_onRegister() {
		AsyncStorage.getItem("registration").then((value) => {
								this.state.myForm = value;
								myData = value
								console.log('My status for today is'+myData);
		                        if(myData == 'done') {
		                            // daily survey
			                        this.state.navigate('Survey', {onGoBack: () => {
			            	                this._setSurveyState();
			            	                this.registerNotification();
			                                this._askOptionalSurvey()
			                            }, 
			                                lat : this.state.latitude,
                                            lng : this.state.longitude
			                            });
			                        return;  
		                        }
		                        else { 
		                          // registration
			                        this.state.navigate('FormView',{countryName : this.state.country,
			                        		lat : this.state.latitude,
                                            lng : this.state.longitude,
			                         onGoBack: () =>
			                        {
			                                console.log("coming back");
			            	                this._setBarcodeState();
			                            }
			                        });
		                        }
		}).done();
	}
    _setSurveyState() {
        AsyncStorage.getItem("dateSurvey").then((value) => {
		    this.setState({"mySurveyDate": value});
		}).done();
    }
    _setBarcodeState() {
        AsyncStorage.getItem("barcode").then((value) => {
		    this.setState({"barcode": value});
		}).done();
    }
    _askOptionalSurvey() {
       AsyncStorage.getItem("optionalSurvey").then((value) => {
                                const optionalSurvey = JSON.parse(value)
                                if (optionalSurvey) {  
                                    if (!optionalSurvey.stopAsking)
                                        OptionalSurvey.askUser(this._onOptionalSurvey)
								} else {
								     OptionalSurvey.askUser(this._onOptionalSurvey)
								}
						}).done();
    }  

	_onOptionalSurvey(answer) {
	    if (answer==1)
            this.state.navigate('Survey', {form:OptionalSurvey.form, countryName : this.state.country});
        if (answer==2) {
        }
        if (answer==3) {
            AsyncStorage.setItem("optionalSurvey", JSON.stringify({stopAsking:true}));
        }
	}

	_onListPlaces() {
		this.state.navigate('listPlaces',
			{
				likedPlaces : this.state.myPlaces,
				lat : this.state.latitude,
				long : this.state.longitude
			}
		);
	}
	
	_onInfo() {
		this.state.navigate('Info');
	}

    // set current index in place array
	_setPlaces(position) { // change to document id
	    const place = this.state.places[position]
	    const venueId = place.venue.id
	    console.log('bbbbb'+this.hasPlace('id',venueId,this.state.myPlaces))
	    if (!this.hasPlace('id',venueId,this.state.myPlaces)) {
	        console.log("adding like")
			this.state.myPlaces.push(this.state.places[position])
		}
		else {
		    console.log("not liking")
		}
		this.state.seen.push(venueId)
		AsyncStorage.setItem(prefIdMyPlaces, JSON.stringify(this.state.myPlaces)); // favorites
		AsyncStorage.setItem(prefIdSeen, JSON.stringify(this.state.seen)); // seen
		this.setState({myPlaces:this.state.myPlaces});
	}
	
	hasPlace(prop, value, data) {
         return data.some(function(obj) {
                return obj.venue.id === value;
        });
    }
    
	_onDataChange(value) {
		object = value;
	}

	render() {
		let CardView;
		let SurveyButton;
		let barcodeButton;
		if(this.state.loading) {
			CardView = <ActivityIndicator
									color={'#fff'}
									animating={this.state.loading}
									style={[styles.centering, {height: 80}]}
									size="large"
								/>
		} else {
			if(this.state.places.length > 0) {
				CardView = <SwipeCards
										places= {this.state.places}
										likedPosition= {(position) => this._setPlaces(position)}
										onDescription={this._onDescription}
										receiveCardData={(obj) => this._onDataChange(obj)}
									/>
			}
		}
		if(this.state.mySurveyDate!=CommonHelper._getDate()) {
			SurveyButton = 	<TouchableOpacity onPress={this._onRegister}>
												<Image source={Constant.IMAGE_SURVEY} style={styles.survey}/>
											</TouchableOpacity>
		} else {
			SurveyButton = <View style={{width: 25}}/>
		}
		if(this.state.barcode) {
			barcodeButton = 	<TouchableOpacity onPress={this._onBarcode}>
								<Image source={Constant.IMAGE_BARCODE} style={styles.barcode}/>
						</TouchableOpacity>
		} else {
			barcodeButton = <View style={{width: 25}}/>
		}
		return(
				<Image style={styles.imageView} source={Constant.IMAGE_BACKGROUND}>
					<View style={styles.header}>
					    {barcodeButton}
						<Text style={styles.textHeader}>{Constant.APPHEADER}</Text>
						{SurveyButton}
					</View>
					<Text style={styles.title}>{this.state.country}</Text>
					{CardView}
					<View style={styles.listCard}>
						<TouchableOpacity onPress={this._onListPlaces} style={styles.listBarButton}>
							<Image source={Constant.IMAGE_LISTCARDS} style={styles.listCardImage}/>
						</TouchableOpacity>
					</View>
					{!this.state.loading?
					<View style={{position: 'absolute', top: Dimensions.get('window').height-100, left:  Dimensions.get('window').width/2-25, alignItems: 'center'}}>
                      <TouchableOpacity onPress={this._onRefresh}>
                            <Image source={Constant.IMAGE_SEARCH} style={styles.refreshImage}/>
                       </TouchableOpacity>
                    </View>
                    :null}
					<View style={styles.infoView}>
						<TouchableOpacity onPress={this._onInfo} style={styles.infoBarButton}>
							<Image source={Constant.IMAGE_INFO} style={styles.listCardImage}/>
						</TouchableOpacity>
					</View>
				</Image>
		)
	}
}

Tourist.propTypes = {
	places: PropTypes.array,
	likedPosition: PropTypes. number,
	onDescription: PropTypes.func,
	receiveCardData: PropTypes.object
}