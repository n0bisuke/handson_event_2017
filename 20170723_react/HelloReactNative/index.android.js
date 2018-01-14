/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Beacons from 'react-native-beacons-android';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

Beacons.detectIBeacons();
async function start(){
    try {
      await Beacons.startRangingBeaconsInRegion('REGION1')
      console.log(`Beacons ranging started succesfully!`)
    } catch (err) {
      console.log(`Beacons ranging not started, error: ${error}`)
    }
};
start();

export default class HelloReactNative extends Component {
  componentDidMount() {
    // console.log('aaa');
    // fetch('https://4f20dd49.ngrok.io')
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });

    // Start detecting all iBeacons in the nearby


    // Print a log of the detected iBeacons (1 per second)
    DeviceEventEmitter.addListener('beaconsDidRange', (data) => {
      console.log('Found beacons!', data.beacons)
      fetch(`https://4f20dd49.ngrok.io/${data.beacons}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!!!!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HelloReactNative', () => HelloReactNative);
