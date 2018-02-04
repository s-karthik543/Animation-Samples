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
  View,
  Animated,
  Easing
} from 'react-native';
import CollapseDemo from './src/toolbar/CollapseDemo'
import Slider from 'react-native-slider'
import Translation from './src/Translation'
import SlideButton from './src/SlideButton';
import Ripple from './src/Ripple'
import Seekbar from './src/Seekbar';
import { StackNavigator } from 'react-navigation';

export default class App extends Component {

  componentDidMount() {
    console.log("Route ", this.refs.nav)
  }
  render() {
    return (
      <Routes ref="nav" />
    );
  }
}
/*
const Routes = StackNavigator({
  Slider: {
    screen: SlideButton
  }
})*/

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

let MyTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const outputRange = [.8, 1, 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange,
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange,
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

export const MyCustomTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1];

  const opacity = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1, 0]),
  });

  const translateY = 0;
  const translateX = position.interpolate({
    inputRange,
    outputRange: ([-300, 0, 0, 0]),
  });

  return {
    // opacity,
    transform: [
      { translateX },
      { translateY }
    ],
  };
};

let TransitionConfiguration = () => {
  return {
    // Define scene interpolation, eq. custom transition
    screenInterpolator: (sceneProps) => {
      const { position, scene } = sceneProps;
      const { index } = scene;

      // return MyTransition(index, position);
      return MyCustomTransition(index, position)
    }
  }
};

const MyTransitionSpec = ({
  duration: 2000,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
});


const Routes = StackNavigator({
  Slider: {
    screen: SlideButton
  },
  Ripple: {
    screen: CollapseDemo
  }
}, {
    transitionSpec: MyTransitionSpec,
    transitionConfig: TransitionConfiguration,
    header:null,
    headerMode:'none'
  })
