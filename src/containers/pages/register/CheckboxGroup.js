import React, { Component } from 'react';

import {
  Animated,
  Slider
} from 'react-native';

import { ListItem, Text, Textarea, View, List, CheckBox, Button, Icon, Body, Grid, Col, Row} from 'native-base';

class MyText extends Component {
  render() {
    return <Text>{Math.floor(this.props.text)}</Text>;
  }
}

	
const AnimatedText = Animated.createAnimatedComponent(MyText);

export default class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
	
 this.state = {
      units: new Animated.Value(props.value),
      value: props.value,
      clicked: false,
      yes: !this.props.foldable,
      no: false,
      noComment: false,
      checked: {},
      extraAnswer: {},
      exclusive: null
    };
  }
  
   onPress(){ // call whenever item is changed
      let answer = this.props.data;
      console.log(answer)
      const keys = Object.keys(answer) // changed to answer to have fields set
      keys.forEach(x => { 
          answer[x].response = this.state.checked[x]?this.state.checked[x]:false;    
          if (answer[x].extra) {
              answer[x].responseComment = this.state.extraAnswer[x]?this.state.extraAnswer[x]:"";   // if extra is expected    
              delete answer[x].extraHint; // save bandwidth
              }
      });   
     var answersAll = {}  
     answersAll = {
        title: this.props.title,
        type: 'CheckboxGroup',
        answer
      }   
      if (this.props.foldable)
        answersAll.response = this.stringifyResponse()
      if (this.props.topExtraHint)
        answersAll.responseComment = this.state.extraAnswer["topExtra"]?this.state.extraAnswer["topExtra"]:''
        
      this.props.onChange(answersAll);
    }
  stringifyResponse() {
    if (this.state.yes)
        return "yes";
     if (this.state.no)
        return "no";
     if (this.state.noComment)
        return "noComment";
  }
  
  toggleSwitch(key, exclusive) {
        var checked = this.state.checked;
        checked[key] = !checked[key];
        if (exclusive) { // if its the exclusive button, set all to false
            const v = checked[key];
            const keys = Object.keys(checked)
            keys.forEach(x => { 
                checked[x] = false; 
            });
            checked[key] = v;
            this.onPress(key);
            this.state.exclusive = key;
        } else {
              if (this.state.exclusive)
                checked[this.state.exclusive] = false; 
        }
		 this.setState({
			checked: checked,
			exclusive: checked[key] & exclusive?key:null // store exclusive button
		});
		this.onPress()
	} 
	  
	
	renderButton() {
        return(

         <View style={{flex:1, flexDirection: 'row'}}>
          <Button
           bordered={!this.state.yes}
           success={this.state.yes}
            onPress={() => {
                  this.setState({yes: true, no: false, noComment: false, clicked: true}, this.onPress)                 
                }
            } 
            style={{margin: 5}}
            >

            <Text>Ja</Text> 
            <Icon
              android={this.state.yes ? "md-arrow-dropup" : "md-arrow-dropdown"}
              ios={this.state.yes ? "ios-arrow-up" : "ios-arrow-down"}/>
          </Button>

            <Button
             bordered={!this.state.no}
             success={this.state.no&&this.state.clicked}
            onPress={() => {
                this.setState({yes: false, no: true, noComment: false, clicked: true}, this.onPress)
                }
            }
            style={{margin: 5}}
            >
            <Text>Nein</Text>
          </Button> 
          {this.props.ignorable?
          <Button
             bordered={!this.state.noComment}
             success={this.state.noComment&&this.state.clicked}
            onPress={() => {
                this.setState({yes: false, no: false, noComment: true, clicked: true}, this.onPress)
                }
            }
            style={{margin: 5}}
            >
            <Text>Keine Angabe</Text>
          </Button>:null 
          }
</View>
        );
      }

   renderList() {
        return(
            <List>
                {this.props.data.map((rowData, rowIdx) => 
                    {return this.renderListItem(rowData, rowIdx)}
                    )}                                         
            </List>         
      );
    }  
    
  renderListItem(rowData,rowIdx) {
        return(
            <ListItem onPress={() => this.toggleSwitch(rowIdx, rowData.exclusive)} key={rowIdx}>
              <Grid>
                <Row>
                    <CheckBox checked={this.state.checked[rowIdx]}  onPress={() => this.toggleSwitch(rowIdx, rowData.exclusive)}/>
                    <Text style={{marginLeft:8}}>{rowData.label}</Text>
                </Row>
                <Row>
                    {rowData.extra&this.state.checked[rowIdx]?this.renderExtra(rowData.extraHint, rowIdx):null} 
                </Row> 
               </Grid>
            </ListItem> 
            
        );
  }    
  
  // optional textfield if checked, and configured
  renderExtra(hint,key){
      return(

            <View style={{flex: 1, flexDirection: 'column'}}> 
            <Textarea
              value={this.state.extra}
              placeholder={hint?hint:'Details'}
              rowSpan = {2}
              bordered
              onChangeText={ (value) => {
                 var extraAnswer = this.state.extraAnswer;
                 extraAnswer[key] = value;
                 this.setState({
			        extraAnswer: extraAnswer
		        }, this.onPress);
		      }}
            />
        </View>

      );
    }
		
   render() {
      return(
        <View style={{flex: 1, flexDirection: 'column'}}> 
            {this.props.foldable?this.renderButton():null}
            {this.state.yes&&this.props.topExtraHint?this.renderExtra(this.props.topExtraHint,"topExtra"):null}
            {this.state.yes?this.renderList():null}
        </View>
      );
    }
}
//             

//onPress={this.toggleSwitch('first')}