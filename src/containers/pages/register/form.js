//@flow
import React from 'react';
import {   AsyncStorage } from 'react-native'; 
import { connect } from 'react-redux';

import { NavigationActions } from 'react-navigation'
import FormView from './FormView';
import AntaviSense from '../../utils/antavisense';

// later exampleForm will be composed

import * as Registration from   './forms/form_registration'
import * as Tourist2 from       './forms/form_tourist2_main'; 
import * as Zika from          './forms/form_zika_main'; 
import * as Rheuma from         './forms/form_tourist2_rheuma'; 
import * as Cardio from         './forms/form_tourist2_cardio'; 
import * as Pulmo from          './forms/form_tourist2_pulmo'; 
import * as Apnoe from          './forms/form_tourist2_apnoe'; 
import * as Git from            './forms/form_tourist2_git'; 
import * as Tansania from       './forms/form_tourist2_tansania'; 

import * as OptionalSurvey from "../register/forms/optional_survey";

function fuseSurveys(registration) {
    var fused = {};    
    var study = "";
    registration.data.forEach( (x) => {
    
        //  choose the form: TODO: refactor to a dictionary of forms
        //  add additional info
        if (x.key=="study" && x.value=="tourist") {
            study = x.value;
            fused = Tourist2.form;
            fused.uid = x.extraAnswer; // TODO put to settings
        } 
        if (x.key=="study" && x.value=="zika") {
            fused = Zika.form;
            AsyncStorage.setItem("barcode",'enabled');
        } 
        
        if (x.key=="destination") {
            fused.base = x.value;
            if ((x.value=="Tansania" || x.value=="China" || x.value=="Peru") && study=="tourist") {
                 AsyncStorage.setItem("optionalSurvey", JSON.stringify({stopAsking:false}));
            }
            else {
                AsyncStorage.setItem("optionalSurvey", JSON.stringify({stopAsking:true}));
            }
        } 
        
        if (x.key=="destination" && x.value=="Tansania") {
            fused.data = fused.data.concat(Tansania.form.data);
        } 

        if (x.key=="rheuma" && x.value==1) {
            fused.data = fused.data.concat(Rheuma.form.data);
        } 
                
        if (x.key=="git" && x.value==1) {
            fused.data = fused.data.concat(Git.form.data);
        }
         
        if (x.key=="cardio" && x.value==1) {
            fused.data = fused.data.concat(Cardio.form.data);
        } 
        
        if (x.key=="apnoe" && x.value==1) {
            fused.data = fused.data.concat(Apnoe.form.data);
        } 
        
        if (x.key=="pulmo" && x.value==1) {
            fused.data = fused.data.concat(Pulmo.form.data);
        } 
    });   
    return fused; 
}

function mapStateToProps({ settings }){
  console.log(settings)
  if (!settings) { // default
    settings = {};
    settings.user = {'id':0,'name':'Anonymous'};
    settings.event = {'id':0,'name':'Tourist'};
    settings.base = {'id':0,'name':''};
    settings.mandatory = true;
  }
  return {
      settings: settings,
      className: Registration.form.className,
      form: Registration.form,
   }
}
export default connect(mapStateToProps,{
  navigateBack: () => NavigationActions.back(null),
  create: (data) => {
        console.log(data);
        AsyncStorage.setItem("registration", 'done');
        AntaviSense.insertCustomData(data.className,data);
        return {type: "setform", form:fuseSurveys(data)}
    }
})(FormView)