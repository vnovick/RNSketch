import React, { Component } from 'react';
import {observer} from 'mobx-react/native';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';


import Button from './button';

class GameMenu extends Component {
  constructor(){
    super();
    this.startGame = this.startGame.bind(this);
  }

  startGame(){
    this.props.gameManager.startGame();
    this.props.navigator.push({id:"board"})
  }

  render(){
    return (
      <View style={styles.container}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcome}>Welcome to Sketching app</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText} onPress={ this.startGame }>Start Game</Button>
            <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText}>Choose Level</Button>
            <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText}>Settings</Button>
            <Button containerStyle={styles.buttonContainer} textStyle={styles.buttonText}>Exit</Button>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  welcomeContainer: {
    justifyContent: 'flex-start',
    marginTop: 100,
    flex: 1
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    color: 'red',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: '#87CEFA',
    borderWidth: 5,
    borderRadius: 5,
    borderColor: '#87CEFA',
    margin: 10,
    width: 200
  }
});

export default observer(['gameManager'])(GameMenu)
