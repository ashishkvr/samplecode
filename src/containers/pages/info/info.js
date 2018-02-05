import React, { Component } from 'react';
import {
  Alert,
  AsyncStorage,
  AppRegistry,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Vibration,
  Text,
  View,
  Platform,
  Image, 
  WebView,
  TouchableHighlight,
  Icon,
  ScrollView,
  Switch,
  Linking
} from 'react-native';
import * as Constant from '../../utils/const';
import CommonHelper from '../../utils/helper';
import NavigationBar from '../components/navigationBar/navigationBar';
import Communications from 'react-native-communications';
import styles from './infoStyle';
var PushNotification = require('react-native-push-notification');

const {height, width} = Dimensions.get('window');

export default class Register extends Component {

  static navigationOptions = {
    headerMode: 'none',
    header: null,
    gesturesEnabled: false
  }

  constructor(props){
    super(props);
    this.state = {
      navigate: this.props.navigation.navigate
    }
    
    AsyncStorage.getItem("remind").then((value) => {
        if (value=='true') {
            this.setState({falseSwitchIsOn: true});
        }
        else {
            this.setState({falseSwitchIsOn: false});
        }
    });
  }
  
  cancelNotification() {
    PushNotification.cancelAllLocalNotifications();
    AsyncStorage.setItem("remind", 'false');
    this.setState({falseSwitchIsOn: false})
  }
  registerNotification() {
	PushNotification.configure({

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
    },


    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
    });
        //PushNotification.cancelAllLocalNotifications();
        
        var reminder = new Date();
        reminder.setHours(18);
        reminder.setMinutes(0);
        reminder.setSeconds(0);
		PushNotification.localNotificationSchedule({
            message: "Erinnerung: Bitte füllen Sie den Fragebogen jetzt aus.", // (required)
            date: reminder,
            repeatType: 'day',
            repeatInterval:'day'
        });
     AsyncStorage.setItem("remind", 'true');
     this.setState({falseSwitchIsOn: true})
	}


/*
    <WebView
        source={{uri: 'https://github.com/facebook/react-native'}}
        style={{marginTop: 0}}
      />
*/
   render() {
   const {navigate} = this.props.navigation;
    return (
    <View style={{backgroundColor: 'white'}}>
           <NavigationBar text= {Constant.INFO_TXT} image={Constant.IMAGE_BACK} leftText={Constant.ZURUCK_TXT} _onBackPress={ () => this.props.navigation.goBack(null) }/>
     <ScrollView style={{marginBottom:100}}>
      <View style={{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    margin:20, marginBottom:10
  }}>
        <Text numberOfLines={1} style={{marginTop:20,fontSize:20}}>
            Tourist App
        </Text>
                <Image
          style={{width: 100, height: 100}}
          source={Constant.IMAGE_APPICON}
        />
        
       <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop:20, marginBottom:10}}>
            <Switch
                onValueChange={(value) => {
                                            if (value) { 
                                                this.registerNotification();
                                            }
                                            else {
                                                this.cancelNotification();
                                            }
                                          }
                                }
                value={this.state.falseSwitchIsOn} />
                <Text style={{marginTop:6}}>Erinnerung täglich um 18:00</Text>
            </View>
        
        <Text numberOfLines={5} style={{marginTop:10}}>
         Tourist App wurde von antavi GmbH für die Universität Zürich und das Schweizerisches Tropen- und Health-Institut entwickelt.
        </Text>
         <Text numberOfLines={1} style={{marginTop:10,fontWeight: 'bold'}}>
            Notfallnummer bei medizinischen Notfällen
        </Text>
        <TouchableOpacity onPress={() => Communications.phonecall('+41 61 2848 144', true)}>
        <Text style={{color: 'green', fontSize:20}}>+41 61 2848 144</Text>
         </TouchableOpacity>
        <Text numberOfLines={2} style={{color: 'gray', fontSize:10}}>
            Swiss TPH (24 Std. besetzt). Kostenpflichtig nach Ärztetarif TarMed.
        </Text>
         <Text numberOfLines={1} style={{marginTop:10,fontWeight: 'bold'}}>
        Kontakt für Studienspezifische Fragen  
         </Text>    
     
        <Text numberOfLines={1} style={{marginTop:10,fontWeight: 'bold'}}>
            Zürich
        </Text>
        <TouchableHighlight onPress={() => Linking.openURL('mailto:tourist@uzh.ch?subject=Tourist App')}>
            <Text numberOfLines={1} style={{color: 'green', fontSize:20}}>tourist@ebpi.uzh.ch</Text>
        </TouchableHighlight>
      <Text numberOfLines={1} >
            Oder besuchen Sie unsere
        </Text>
        <TouchableHighlight onPress={() => Linking.openURL('https://www.ebpi.uzh.ch/de/services/travelclinic.html')}>
            <Text numberOfLines={1} style={{color: 'green',fontSize:20}}>Website</Text>
        </TouchableHighlight>
        <Text numberOfLines={1} style={{marginTop:10, fontWeight: 'bold'}}>
            Basel
        </Text>
        <TouchableHighlight onPress={() => Linking.openURL('mailto:tourist@swisstph.ch?subject=Tourist App')}>
            <Text numberOfLines={1} style={{color: 'green', fontSize:20}}>tourist@swisstph.ch</Text>
        </TouchableHighlight>
      <Text numberOfLines={1}>
            Oder besuchen Sie unsere
        </Text>
        
        <TouchableHighlight onPress={() => Linking.openURL('https://www.swisstph.ch/de/reisemedizin')}>
            <Text numberOfLines={1} style={{color: 'green', fontSize:20}}>Website</Text>
        </TouchableHighlight>
        
       
       
       </View>
        </ScrollView>
       </View>
    );
  }
}