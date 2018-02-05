//@flow
import moment from 'moment';
import React, { Component } from 'react';
import { Alert, AsyncStorage, TouchableOpacity } from 'react-native';

import {
  Container,
  Header,
  Title,
  View,
  Content,
  Card,
  Grid,
  Row,
  CardItem,
  Button,
  Icon,
  Spinner,
  Text,
  Left,
  Body,
  Right
} from 'native-base';

import DateTimePicker from 'react-native-modal-datetime-picker';
import ButtonGroup from './ButtonGroup';
import SliderGroup from './SliderGroup';
import CheckboxGroup from './CheckboxGroup';

export default class FormView extends Component {

  static navigationOptions = {
    headerMode: 'none',
    header: null
  }

  constructor(props){
    super(props);
    const {settings} = props;
    let placeName = null;
    const { params } = this.props.navigation.state;
    console.log("FormView:params");
    console.log(params);
    if(params && params.countryName) {
        placeName = params.countryName?params.countryName:null;
    }
    console.log("params country" + params.countryName);
    if(params && params.doc){
      this.state = params.doc;
      
    }else{
      this.state = {
        ts: Math.round((new Date).getTime()),
        data: [],
        navigate: this.props.navigation.navigate,
        userName: settings!=null?settings.user.name:'',
        eventName: settings!=null?settings.event.name:'',
        baseName: settings.base.name!= '' ? settings.base.name : placeName,
        mandatory: settings!=null?settings.mandatory:false,
        la: params.lat,
        lo: params.lng
        } 
    }

    this.state.isDateTimePickerVisible = false;

    this.onSend = this.onSend.bind(this);
  }


  shouldComponentUpdate(nextProps, nextState){
    return this.state.isDateTimePickerVisible != nextState.isDateTimePickerVisible;
  }

  itemSelected(i, item){
    let data = [...this.state.data];
    data[i] = item;
    this.setState({data});
    console.log(item);
  }
  
    
  // item is copied and overwritten
  itemChanged(i, item){
    let data = [...this.state.data];
    data[i] = item;
    this.setState({data});
    console.log(item);
  }




 onSend(){
    let missing = [];
    this.props.form.data.map((item, i) => {
      if(!this.state.data[i]){
        missing.push((1+i)+'. ');//+item.title.substring(0, 10)+'...');
      }
    })
    
    if(missing.length > 0){
        var options;
        if (this.state.mandatory) {
            options = [{text: 'Ok, Zurück', style: 'cancel'}]
        }
        else {
            options = [this.state.mandatory?null:{text: 'Trotzdem verschicken', onPress: () => this.storeAndGoBack() },
            {text: 'Ok, Zurück', style: 'cancel'}]
        }
        Alert.alert(
            'Angaben Unvollständig?',
            'Bitte füllen Sie '+missing.join(", ")+' aus.',
        options,
         { cancelable: false }
        )
    }
    else {
        this.storeAndGoBack()
    }
}
  storeAndGoBack() {
      // everything ok, create doc
    console.log('storeAndGoBack');
    const doc =  {
      className: this.props.className,
      ...this.state
    };

    delete doc.isDateTimePickerVisible;

    this.props.create(doc);
    // and go back to list
    this.props.navigateBack();
    if (this.props.navigation.state.params.onGoBack)
        this.props.navigation.state.params.onGoBack();
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    const ts = Math.round(date.getTime());

    this.setState({
      isDateTimePickerVisible: false,
      ts: isNaN(ts) ? this.state.ts : ts
    });
  };
  
  handleScroll(event) {
    this.setState({ scrollY: event.nativeEvent.contentOffset.y });
}

  render() {
    _.set(this.refs, 'Content._scrollview.resetCoords', { x: 0, y: this.state.scrollY });

    const {form} = this.props;

    if(!form){
      // Loading
      return (
        <Container>
          <Spinner />
        </Container>
      );
    }

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>this.props.navigation.goBack(null)}>
              <Icon name="arrow-back"/>
            </Button>
          </Left>
          <Body>
            <Title>{form.title}</Title>
          </Body>

          <Right/>
        </Header>


        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          date={moment.unix(this.state.ts/1000).toDate()}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='datetime'
          titleIOS='Behandlungszeit ändern'
          maximumDate={new Date()}
        />

        <Content
        disableKBDismissScroll={true}
        ref="Content" 
        onScroll={event => this.handleScroll(event)}>
          <Card style={{backgroundColor: '#F8F9F8'}}>
            <CardItem bordered style={{backgroundColor: '#ECEDEC'}}>
              <Grid>
                <Row>
                  <Text style={{fontWeight: "bold"}}>{this.props.form.title}</Text>
                </Row>

                <Row>
                  <Text>von </Text><Text style={{color: "#8DA624"}}>{this.state.userName}</Text>
                </Row>

                <Row>
                  <Text>gemeldet um </Text>
                  <TouchableOpacity onPress={this._showDateTimePicker}>
                    <Row>
                      <Text style={{color: "#8DA624"}}>{moment.unix(this.state.ts/1000).format("HH:mm")}</Text>
                      <Text> am </Text><Text style={{color: "#8DA624"}}>{moment.unix(this.state.ts/1000).format("D.M.YYYY")}</Text>
                    </Row>
                  </TouchableOpacity>
                </Row>

                <Row style={{paddingTop: 3}}>
                  <Icon name="calendar" style={{color: "#7E7F7E"}}/>
                  <Text style={{color: "#8DA624", marginRight: 10}}>{this.state.eventName}</Text>
                  <Icon name="md-pin" style={{color: "#7E7F7E"}}/><Text style={{color: "#8DA624"}}>{this.state.baseName}</Text>
                </Row>

                <View>
                  {this.state.status &&
                    <Row>
                      <Text>Status: </Text>
                      <Text style={{color: "#8DA624"}}>{this.state.status == 'seen' ? 'gesehen' : 'unbekannt'}</Text>
                    </Row>
                  }
                </View>
              </Grid>
            </CardItem>

            {form.data.map((elem,i) => (
        
              <View key={i}>
                <CardItem header>
                  <Text>{(i+1)+'. '+elem.title}</Text>
                </CardItem>
                {
                    elem.subtitle?
                    <Text style={{fontWeight:'normal', fontSize:16, marginTop:-10, paddingLeft:12, backgroundColor:'white', color:'#555555'}}>{elem.subtitle}</Text>
                    :null
                }
                <CardItem bordered>                
                {                
                elem.component=="ButtonGroup"?
                  <ButtonGroup title={elem.title} elemKey={elem.key}  data={elem.options} selectedItem={this.state.data[i]} noCols={3} onSelected={item => this.itemSelected(i, item)} />
                : elem.component=="SliderGroup"?
                  <SliderGroup title={elem.title} data={elem.options} min={elem.min?elem.min:0} max={elem.max?elem.max:4} step={elem.step?elem.step:1} value={0} valuesText={elem.valuesText} onChange={item => this.itemChanged(i, item)}/>
                : elem.component=="CheckboxGroup"?
                  <CheckboxGroup foldable={elem.foldable} ignorable={elem.ignorable} topExtraHint={elem.extraHint} title={elem.title} data={elem.options} onChange={item => this.itemChanged(i, item)}/>
                : <Text>kenn ich nicht</Text>
                }
                </CardItem>
              </View>
            ))}

            <CardItem>
              <Right>
                  <Button success onPress={this.onSend}><Icon name="send" /><Text>senden</Text></Button>
              </Right>
            </CardItem>

          </Card>
        </Content>
      </Container>
    );
  }
}
