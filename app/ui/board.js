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
  TouchableOpacity,
  View
} from 'react-native';
import BackgroundScreen from './widgets/background';
import {observer} from 'mobx-react/native';
import Sketch from 'react-native-sketch';
import ColorPicker from './colorPicker';

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
    backgroundColor: '#111111',
    padding: 20,
  },
  buttonTextColor: {
    color: '#111',
    fontSize: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
});

@observer(['gameManager'])
export default class Board extends Component {

  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.state = {
      strokeColor: '#'+Math.floor(Math.random()*16777215).toString(16)
    };
  }

  changeColor(color){
    this.setState({
      strokeColor: color
    });
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
    return (
      <BackgroundScreen>
        <View style={styles.container}>
          <Text style={styles.instructions}>
            Use your finger on the screen to draw.
          </Text>
          <ColorPicker onChange={this.changeColor} color={this.state.strokeColor} />
          <Sketch
            fillColor="#f5f5f5"
            strokeColor={this.state.strokeColor}
            strokeThickness={2}
            onUpdate={this.onUpdate}
            ref={(sketch) => { this.sketch = sketch; }}
            style={styles.sketch}
          />
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
