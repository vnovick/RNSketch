import React, {Component} from 'react';
import Slider from 'react-native-slider';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';

var styles = {
  buttonTextColor: {
    color: '#111',
    fontSize: 16,
  }
};


export default class ColorPicker extends Component {
  constructor(props){
    super(props);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      color: this.props.color
    };
  }

  changeColor(id,color){
    var stringColor = this.state.color;
    stringColor = stringColor.split("");
    color = color.toString(16).toUpperCase();
    if(color.length === 1){
      color = "0"+color;
    }
    if(id==='r'){
      this.setState({
        color: "#"+color+(stringColor[3] || '0')+(stringColor[4] || '0')+(stringColor[5] || '0')+(stringColor[6] || '0')
      });
    } else if(id==='g'){
      this.setState({
        color: "#"+(stringColor[1] || '0')+(stringColor[2] || '0')+color.toString(16).toUpperCase()+(stringColor[5] || '0')+(stringColor[6] || '0')
      });
    } else if(id==='b'){
      this.setState({
        color: "#"+(stringColor[1] || '0')+(stringColor[2] || '0')+(stringColor[3] || '0')+(stringColor[4] || '0')+color
      });
    }

    this.props.onChange(this.state.color);
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={{backgroundColor: this.state.color,padding:8}}
        >
        </TouchableOpacity>
        <Slider
            value={0}
            onValueChange={(value) => this.changeColor('r',Math.floor(value*255))} />
        <Slider
            value={0}
            onValueChange={(value) => this.changeColor('g',Math.floor(value*255))} />
        <Slider
            value={0}
            onValueChange={(value) => this.changeColor('b',Math.floor(value*255))} />
      </View>
    );
  }
}
