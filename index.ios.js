import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Index from './app/ui';

export default class RNSketch extends Component {
  render() {
    return (
      <Index/>
  );
  }
}

AppRegistry.registerComponent('RNSketch', () => RNSketch);
