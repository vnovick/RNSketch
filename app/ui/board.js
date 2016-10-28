/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Picker,
  TouchableOpacity,
  View
} from 'react-native';

import Slider from 'react-native-slider';
import BackgroundScreen from './widgets/background';
import {observer} from 'mobx-react/native';
import Sketch from 'react-native-sketch';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  sketch: {
    height: 250, // Height needed; Default: 200px
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth:1,
    padding: 15,

  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight:'200'
  },
});

@observer(['gameManager'])
export default class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      red : 0,
      blue:0,
      green:0,
      color1: 255,
      thickness:2
    }
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillMount(){
        this.setState({
          color1: 255 * this.state.red})

  }
  onSave() {
    this.sketch.saveImage(this.props.gameManager.encodedSignature)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }

  onUpdate(base64Image){
    this.props.gameManager.updateSignature(base64Image)
  }

  render() {

    var color1 = "rgb(" + this.state.red * 255 + ",0,0)"
    var color2 = "rgb(0," + this.state.green * 255 + ",0)"
    var color3 = "rgb(0,0," + this.state.blue * 255 + ")"
    var red = this.state.red * 255
    var blue = this.state.blue * 255
    var green = this.state.green * 255
    var stroke = "rgb(" + this.state.red * 255 + "," + this.state.green * 255 + "," +  this.state.blue * 255  + ")"
    console.log(this.state.red)
    return (
      <BackgroundScreen>
        <View style={styles.container}>
          <Text style={styles.instructions}>
            Use your finger on the screen to sign.
          </Text>
          <Sketch
            fillColor="#f5f5f5"
            strokeColor= {stroke}
            strokeThickness={this.state.thickness}
            onUpdate={this.onUpdate}
            ref={(sketch) => { this.sketch = sketch; }}
            style={styles.sketch}
          />
          <View>
           <Slider
          value={this.state.red}
          thumbTintColor = {color1}
          onValueChange={(red) => this.setState({red})} />
          <Slider
          value={this.state.value}
          thumbTintColor = {color2}
          onValueChange={(green) => this.setState({green})} />
          <Slider
          value={this.state.value}
          thumbTintColor = {color3}
          onValueChange={(blue) => this.setState({blue})} />
          
          </View>
          <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={() => this.setState({thickness:2 })} style={{padding:10, margin:5, borderWidth:1, borderColor:"#333", backgroundColor:'rgba(0,0,0,0.4)'}}>
          <Text style={{color:"#fff"}}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({thickness: 4})} style={{padding:10, margin:5, borderWidth:1, borderColor:"#333", backgroundColor:'rgba(0,0,0,0.4)'}}>
          <Text style={{color:"#fff"}}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({thickness: 6})} style={{padding:10, margin:5, borderWidth:1, borderColor:"#333", backgroundColor:'rgba(0,0,0,0.4)'}}>
          <Text style={{color:"#fff"}}>3</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({thickness: 8})} style={{padding:10, margin:5, borderWidth:1, borderColor:"#333", backgroundColor:'rgba(0,0,0,0.4)'}}>
          <Text style={{color:"#fff"}}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({thickness: 10})} style={{padding:10, margin:5, borderWidth:1, borderColor:"#333", backgroundColor:'rgba(0,0,0,0.4)'}}>
          <Text style={{color:"#fff"}}>5</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={!this.props.gameManager.encodedSignature}
            style={styles.button}
            onPress={this.onSave}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </BackgroundScreen>
    );
  }
}

