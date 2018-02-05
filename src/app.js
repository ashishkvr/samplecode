import React, { Component } from 'react';
import { AppRegistry} from 'react-native';
import { StackNavigator } from 'react-navigation';
import PlaceAround from './containers/pages/place_around/placesAround';
import PlaceDetails from './containers/pages/place_details/placeDetails';
import Survey from './containers/pages/register/survey';
import FormView from './containers/pages/register/form';
import BarcodeScanner from './containers/pages/barcode_scanner/barcodeScanner';
import Info from './containers/pages/info/info';
import ListPlaces from './containers/pages/list_places/listPlaces';

const PlacesStack = StackNavigator({
	place: {screen: PlaceAround},
	listPlaces: {screen: ListPlaces},
});

const ModalStack = StackNavigator({
		placesStack: {screen: PlacesStack},
		placeDetails: {screen: PlaceDetails},
	},
	{ mode: 'modal'
});

const App = {
	ModalStack: {screen: ModalStack},
	place: {screen: PlaceAround},
    FormView: {screen: FormView},
	Survey: {screen: Survey},
	BarcodeScanner: {screen: BarcodeScanner},
	Info: {screen: Info},
};

export const AppNavigator = StackNavigator(App);
