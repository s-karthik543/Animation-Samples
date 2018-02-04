import React, { Component } from 'react';
import {
    View,
    Animated,
    Button,
    PanResponder
} from 'react-native'

export default class SildeButton extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pan: new Animated.ValueXY(),
            isOnDuty: false
        }
    }

    componentWillMount() {

        this.state.pan.addListener(({ x, y }) => {
            console.log("Value ", x)
            // console.log("X ",this.state.pan.x)
            this._valueX = x
            // this._valueY = y;
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
                null, { dx: (this.state.pan.x._value >= 0) ? this.state.pan.x : 0, dy: 0 },
            ]),

            onPanResponderRelease: (e, { vx, vy }) => {
                console.log("vx", vx)
                this.state.pan.flattenOffset();
                if (this._valueX < 125) {
                    this.setState({ isOnDuty: false })
                    Animated.spring(            //Step 1
                        this.state.pan,
                        //Step 2
                        { toValue: { x: 0, y: 0 } }     //Step 3
                    ).start();
                } else if (this._valueX > 125) {
                    this.setState({ isOnDuty: true })
                    Animated.spring(            //Step 1
                        this.state.pan,
                        //Step 2
                        { toValue: { x: 250, y: 0 } }     //Step 3
                    ).start(() => {
                        // this.setState({ isOnDuty: true })                        
                    });
                }
                /*   let currentPosition = height - peekHeight + this._valueY
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
                   }*/
                // Animated.spring(            //Step 1
                //     this.state.pan,         //Step 2
                //     { toValue: { x: 0, y: 0 } }     //Step 3
                // ).start();
            }
        })
    }

    render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center' }} >

                <View style={{ marginHorizontal: 30, height: 50, elevation: 10, backgroundColor: this.state.isOnDuty ? 'green' : 'red', borderRadius: 25, overflow: 'hidden' }} >

                    <Animated.View  {...this.panResponder.panHandlers}
                        style={[this.state.pan.getLayout(), { height: 50, width: 50, borderRadius: 25, backgroundColor: 'white', elevation: 5 }]} />


                </View>

                <Button title='Close' onPress={() => this.props.navigation.navigate('Ripple')} />

            </View >
        )
    }
}