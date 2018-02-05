import React, { Component } from 'react';

import {
  Animated,
  Slider
} from 'react-native';

import { ListItem, Grid, Col, Row, Text, View, Button, Icon} from 'native-base';
import SliderExtended from './SliderExtended';

class MyText extends Component {
  render() {
    return <Text>{Math.floor(this.props.text)}</Text>;
  }
}

const AnimatedText = Animated.createAnimatedComponent(MyText);

export default class SliderGroup extends Component {
  constructor(props) {
    super(props);

 this.state = {
        doesNotApply: false,
    };
  }
  
onPress() {
    let answer = this.props.data;
    this.props.onChange({
        answer,
        type: 'SliderGroup',
        title: this.props.title,
        responding: this.state.doesNotApply?"no":"yes"
      });
}

sliderChanged(key, value, extraAnswer) { // call whenever item is changed
      let answer = this.props.data;
    
       answer[key].response = value
       if (answer[key].extra) {
            answer[key].responseComment = extraAnswer?extraAnswer:"";       
            delete answer[key].extraHint;
            //delete answer[key].extra;
            }
      this.props.onChange({
        answer,
        title: this.props.title,
        responding: this.state.doesNotApply?"no":"yes"
      });
    }

   render() {
      return(
        <View style={{flex: 1, flexDirection: 'column'}}>
          {!this.state.doesNotApply?this.props.data.map((rowData, rowIdx) =>
            <View key={"row_"+rowIdx} style={{marginBottom:15, flex:1, flexDirection: 'row'}}>
                <SliderExtended title={rowData.label} min={this.props.min} max={this.props.max} step={this.props.step} value={0} valuesText={this.props.valuesText} extra={rowData.extra} extraHint={rowData.extraHint} onChange={(value, extraAnswer) => this.sliderChanged(rowIdx, value, extraAnswer)}/>
            </View>)
          :null} 
            <Button style={{margin: 5}}   
                bordered={this.state.doesNotApply}
                light={!this.state.doesNotApply}
                onPress={() => {
                  this.setState({doesNotApply:!this.state.doesNotApply}, this.onPress)
                }
            } >
                <Text>{!this.state.doesNotApply ? "Keine Beschwerden" : "Ausfüllen"}</Text>
                <Icon
                   android={!this.state.doesNotApply ? "md-arrow-dropup" : "md-arrow-dropdown"}
                  ios={!this.state.doesNotApply?  "ios-arrow-up" : "ios-arrow-down"}/>
            </Button>
        </View>
      );
    }
}
