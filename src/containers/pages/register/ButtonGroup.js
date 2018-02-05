//@flow
import Dimensions from 'Dimensions';
import React, { Component } from 'react';

import { View, Button, Icon, Text, Textarea } from 'native-base';

class ButtonGroup extends Component{
    constructor(props){
        super(props);

        const {noRows, selectedItem} = this.props;

        this.state = {
          selectedItem: selectedItem ? selectedItem : {label: undefined},
          noRows: noRows ? noRows : 3,
          extended: !!selectedItem,
        };

        this.renderItem = this.renderItem.bind(this);
        this.renderExtra = this.renderExtra.bind(this);
        this.getData = this.getData.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    onPress(item){
      this.setState({selectedItem: item});
      var response = {
        ...item,
        response: item.value,
        title: this.props.title,
        type: 'ButtonGroup',
      }
      if (this.props.elemKey)
        response.key = this.props.elemKey
      this.props.onSelected(response);
    }

    renderItem(i, item){
      if(item.extensionControl){
        return(
          <Button
            onPress={this.toggleExtension.bind(this)}
            style={{margin: 5}}
            success={this.state.extended}
            key={i}>
           
            <Text>{item.label}</Text>
            <Icon
              android={this.state.extended ? "md-arrow-dropup" : "md-arrow-dropdown"}
              ios={this.state.extended?  "ios-arrow-up" : "ios-arrow-down"}/>
          </Button>
        );
      } 


      return(
        <Button
          bordered={item.label != this.state.selectedItem.label}
          success={item.label === this.state.selectedItem.label}
          onPress={(event) => this.onPress(item)}
          style={{margin: 5}}
          key={i} >

            {item.icon ? <Icon name={item.icon}/> : null}
            <Text>{item.label}</Text>
        </Button>
      );
    }
 


    toggleExtension(){
       this.setState({extended: !this.state.extended, value: !this.state.extended ? undefined : this.state.value});
    }

    renderExtra(hint){
      return(
        <View style={{margin: 10}}>
            <Text>Details</Text>
            <Textarea
              value={this.state.selectedItem.extraAnswer}
              rowSpan = {2}
              placeholder = {hint}
              bordered
              onChangeText={value => this.onPress({...this.state.selectedItem, extraAnswer: value})}
            />
        </View>
      );
    }

    getData(){
      let data = [];

      const extensionItem = {
        extensionControl: true,
        label: this.state.extended ? "weniger" : "mehr",
      };

      // TODO fix this properly, extend at end, length>2 does not work in all cases
      const items = this.state.extended && this.props.data.length > 2  ? this.props.data.concat([extensionItem]) : this.props.data;

      const noRows = !this.state.extended ? this.state.noRows : 1000;
      const {height, width} = Dimensions.get('window');

      let ri = 0;
      let i = 0;
      let row = [];
      let len = 0;
      while(ri < noRows && i < items.length){
        len += items[i].label.length;
        row.push(items[i]);

        if(len > (ri == noRows-1 ? 10*width/375 : 15*width/375)){
          if(ri == noRows-1 && i != items.length - 1){
            row.push(extensionItem);
          }

          data.push(row);
          len = 0;
          row = [];
          ri++;
        }

        i++;
      }

      if(row.length > 0){
        data.push(row);
      }

      return data;
    }



    render() {
      return(
        <View style={{flex: 1, flexDirection: 'column'}}>
          {this.getData().map((rowData, rowIdx) =>
            <View key={"row_"+rowIdx} style={{flex:1, flexDirection: 'row'}}>
              {rowData.map((item, i) => this.renderItem(i, item))}
            </View>
          )}

          {this.state.selectedItem && this.state.selectedItem.extra ? this.renderExtra(this.state.selectedItem.extraHint) : null}
        </View>
      );
    }
}



export default ButtonGroup;
