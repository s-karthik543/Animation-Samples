import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing,
    Dimensions,
    PanResponder
} from 'react-native';

import PropTypes from 'prop-types';

var TRACK_SIZE = 4;
var THUMB_SIZE = 20;

function Rect(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Rect.prototype.containsPoint = function(x, y) {
  return (x >= this.x
          && y >= this.y
          && x <= this.x + this.width
          && y <= this.y + this.height);
};

const DEFAULT_ANIMATION_CONFIGS = {
  spring : {
    friction : 7,
    tension  : 100
  },
  timing : {
    duration : 150,
    easing   : Easing.inOut(Easing.ease),
    delay    : 0
  },
  // decay : { // This has a serious bug
  //   velocity     : 1,
  //   deceleration : 0.997
  // }
};

const { width, height } = Dimensions.get('window')

const peekHeight = height - 200;

const data = { "a": 1, "b": 2 }

export default class Slider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY()
        }
    }

    componentWillMount() {
        this.state.pan.addListener(({ x, y }) => {
            console.log("Value ", y)
            this._valueY = y;
        })
        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,


            // Initially, set the value of x and y to 0 (the center of the screen)
            onPanResponderGrant: (e, gestureState) => {
                this.state.pan.setOffset({ x: this.state.pan.x._value, y: this.state.pan.y._value });
                this.state.pan.setValue({ x: 0, y: 0 });
            },

            onPanResponderMove: Animated.event([
                null, { dx: 0, dy: (this.state.pan.y < -300) ? -300 : this.state.pan.y },
            ]),

            onPanResponderRelease: (e, { vx, vy }) => {
                this.state.pan.flattenOffset();
                let currentPosition = height - peekHeight + this._valueY
                console.log("Y ", currentPosition)
                if (this._valueY <= -100) {
                    Animated.spring(            //Step 1
                        this.state.pan,
                        //Step 2
                        { toValue: { x: 0, y: -300 } }     //Step 3
                    ).start();
                } else {
                    Animated.spring(            //Step 1
                        this.state.pan,         //Step 2
                        { toValue: { x: 0, y: 0 } }     //Step 3
                    ).start();
                }
                // Animated.spring(            //Step 1
                //     this.state.pan,         //Step 2
                //     { toValue: { x: 0, y: 0 } }     //Step 3
                // ).start();
            }

        })
    }

    componentDidMount() {
        let array = []
        for (let value of Object.values(data)) {
            array.push(value)
            console.log("VAlue ", value);
        }
        data["a"] = 5
        for (let value of Object.values(data)) {
            array.push(value)
            console.log("VAlue ", value);
        }
        console.log("VAlue ", array);
    }

    render() {
        console.log("Render")
        // Destructure the value of pan from the state

        return (
            <View style={{
                flex: 1, /*justifyContent: 'center',
                alignItems: 'center',*/
                backgroundColor: '#fafafa'
            }}>

                <View style={{ position: 'absolute', top: peekHeight, width: width, }}>
                    <Animated.View style={[/*this.state.pan.getLayout(),*/ { width: width, flex: 1, backgroundColor: 'white', borderRadius: 25, elevation: 20, height: height /*, transform: [{ translateX }, { translateY }] */ }]} {...this.panResponder.panHandlers} />
                </View>
            </View>
        )
    }
}