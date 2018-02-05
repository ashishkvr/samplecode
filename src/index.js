import React, { Component } from "react";
import { AppRegistry } from 'react-native'
import { Provider } from "react-redux";
import getStore from "./store";
import { AppNavigator } from './app';
import AppWithNavigationState  from './navigation';

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};
const store = getStore(navReducer);
export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Tourist', () => App);