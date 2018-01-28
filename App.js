/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CollapseDemo from './src/toolbar/CollapseDemo'
import Slider from 'react-native-slider'
import PriceDrop from './src/PriceDrop'
import Translation from './src/Translation'
import SlideButton from './src/SlideButton';
import Ripple from './src/Ripple'
import Seekbar from './src/Seekbar'

export default class App extends Component {
  render() {
    return (
      // <View style={{ paddingHorizontal: 20, justifyContent: 'center', flex: 1 }}>
      //   <Slider
      //     trackStyle={customStyles2.track}
      //     thumbStyle={customStyles2.thumb}
      //     minimumValue={0}
      //     maximumValue={220}
      //     animateTransitions={true}
      //     onValueChange={(value) => console.log("Value ", value)} />
      // </View>
      // <Slider />
      <Translation />
    );
  }
}

var customStyles2 = StyleSheet.create({
  track: {
    height: 4,
    // backgroundColor: 'red',
    borderRadius: 2,
  },
  thumb: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 4,
  }
});
