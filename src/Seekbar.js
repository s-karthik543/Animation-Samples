import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    StyleSheet,
    PanResponder
} from 'react-native';

export default class Seekbar extends Component {

    position = 0;
    minimumValue = 0;
    maximumValue = 100;

    state = {
        pan: new Animated.Value(0),
        isOnDuty: false
    }

    componentWillMount() {

        this.state.pan.addListener(({ value }) => {
            // console.log("Value ", value)
            this._value = value
        })

        this.panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: this._handlePanResponderGrant,
            onPanResponderMove: this._handlePanResponderMove,
            onPanResponderRelease: this._handlePanResponderRelease
        })
    }

    _handlePanResponderGrant = (e, gesture) => {
        this.position = this.state.pan._value
        this.state.pan.setValue(this.position);
    }

    _handlePanResponderMove = (e, gestureState) => {
        let newPosition = this.position + gestureState.dx
        if (newPosition < this.minimumValue) {
            this.state.pan.setValue(this.minimumValue)
        } else if (newPosition > this.maximumValue) {
            this.state.pan.setValue(this.maximumValue)
        } else {
            this.state.pan.setValue(newPosition)
        }
    }

    _handlePanResponderRelease = (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
        const { isOnDuty } = this.state
        if (isOnDuty) {
            if (this._value <= this.minimumValue) {
                this.setState({ isOnDuty: false })
                this.animateThumb(this.minimumValue)
            } else {
                this.animateThumb(this.maximumValue)
            }
        } else {
            if (this._value >= this.maximumValue) {
                this.setState({ isOnDuty: true })
                this.animateThumb(this.maximumValue)
            } else {
                this.animateThumb(0)
            }
        }
    }

    animateThumb(value) {
        Animated.timing(
            this.state.pan,
            { toValue: value }
        ).start();
    }

    _measureContainer = (e) => {
        this.maximumValue = e.nativeEvent.layout.width - 50
        console.log("Parent ", e.nativeEvent.layout.width)
        // this._handleMeasure('containerSize', x);
    }

    _measureThumb = (e) => {
        console.log("Child ", e.nativeEvent.layout.width)
    }

    render() {

        const { isOnDuty } = this.state

        return (
            <View style={styles.container} >
                <View
                    style={[styles.track,
                    { backgroundColor: this.state.isOnDuty ? 'green' : 'red' }]}
                    onLayout={this._measureContainer} >

                    <Animated.View
                        {...this.panResponder.panHandlers}
                        onLayout={this._measureThumb}
                        style={{
                            transform: [
                                { translateX: this.state.pan },
                                { translateY: 0 }]
                            , height: 50, width: 50, borderRadius: 25, backgroundColor: 'white', elevation: 5
                        }} />

                    <Text style={{ alignSelf: 'center', color: 'white', position: 'absolute',fontSize:20 }} >{isOnDuty ? 'On Duty' : 'Off Duty'}</Text>

                </View>

            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    track: {
        marginHorizontal: 30,
        height: 50,
        elevation: 10,
        justifyContent: 'center',
        borderRadius: 25,
        overflow: 'hidden'
    }
})