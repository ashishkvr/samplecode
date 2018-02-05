//@flow
import React from 'react';

import { connect } from 'react-redux';
import {  Alert, AsyncStorage } from 'react-native'; 
import { NavigationActions } from 'react-navigation'
import FormView from './FormView';
import AntaviSense from '../../utils/antavisense';
import * as CommonHelper from '../../utils/helper';


function mapStateToProps({settings, nav, form}){
    let formToShow = form

    if (nav.routes[1]&&nav.routes[1].params) { // override if parametrized 
       formToShow = nav.routes[1].params.form?nav.routes[1].params.form:formToShow;
    }
    if (!settings) {
        settings = {};
        if (form.uid)
            settings.user = {'id':0,'name':form.uid};// TODO get from settings 
        else
            settings.user = {'id':0,'name':'Anonymous'}; 
        settings.event = {'id':0,'name':formToShow.className};
        settings.base = {'id':0,'name':formToShow.base}; 
        settings.mandatory = false;
        console.log(formToShow);
    }
  return {
      settings: settings,
      className: formToShow.className,
      form: formToShow, 
   }
}
 


export default connect(mapStateToProps,{
  navigateBack: () => {
        return NavigationActions.back(null); // todo check if       
     },
  create: (data) => {
        AntaviSense.insertCustomData(data.className,data);
        var mydate = CommonHelper._getDate()
        console.log("ulf done!"+ mydate)
        AsyncStorage.setItem("dateSurvey", mydate);
        console.log("ulf returnong!")
        return {type: "SDK_ACTION"}
    }
})(FormView)