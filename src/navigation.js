import React, { Component } from "react";
import { connect } from "react-redux";
import {  addNavigationHelpers } from "react-navigation";
import { AppNavigator } from './app'


class AppWithNavigationState extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        );
    }
}

function mapStateToProps(state){
  return {
    nav: state.nav
  }
}
export default connect(mapStateToProps)(AppWithNavigationState);
