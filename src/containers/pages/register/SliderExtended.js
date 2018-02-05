import React, { Component } from 'react';

import {
  Animated,
  Slider
} from 'react-native';

import { ListItem, Grid, Col, Row, Text, Textarea, View } from 'native-base';


class MyText extends Component {
  render() {
    return <Text>{Math.floor(this.props.text)}</Text>;
  }
}

const AnimatedText = Animated.createAnimatedComponent(MyText);

export default class SliderExtended extends Component {
  constructor(props) {
    super(props);

 this.state = {
      units: new Animated.Value(props.value),
      value: props.value,
      extraAnswer: null
    };
 // this.onPress(); // propagate standard values back
  }
  
   onPress() { // call whenever item is changed
      let answer = this.props.data;
      this.props.onChange(this.state.value, this.state.extraAnswer);
    }
    
    componentDidMount() {
        this.onPress();
    }
  
  renderExtra(hint){
      return(
            <View style={{flex: 1, flexDirection: 'column'}}> 
            <Textarea
              value={this.state.extra}
              placeholder={hint?hint:'Details'}
              rowSpan = {2}
              bordered
              onChangeText={ (value) => {
                 this.setState({
			        extraAnswer: value
		        }, this.onPress);
		      }}
            />
        </View>
      );
    }

  render() {
    return (
        <View style={{flex: 1, flexDirection: 'column'}}>
        <Grid>
          <Col size={4}> 
            <Row><Text>{this.props.title}</Text></Row>
            <Row><Text note> {this.props.valuesText?this.props.valuesText[this.state.value]:null} </Text></Row>
          </Col>

          <Col size={1} style={{ justifyContent: 'center' }}>
            <AnimatedText text={this.state.units}  />
          </Col>

          <Col size={3} style={{ justifyContent: 'center' }}>
            <Slider
              thumbTintColor={'#34485D'}
              step={this.props.step}
              minimumValue={this.props.min}
              maximumValue={this.props.max}
              value={this.state.value}
              onValueChange={(value) => {
               // TODO store in state
                this.state.units.setValue(value);
                this.setState({
			        value: value
		      }, this.onPress);
                }
              }
              onSlidingComplete={(value) => {
                
              }}
            />
          </Col>
        </Grid>
         {(this.props.extra && (this.state.value!=this.props.min)) ? this.renderExtra(this.props.extraHint) : null}
        </View>
        
    );
  }
}
// {this.props.min}(Keine) bis {this.props.max}(Stark)