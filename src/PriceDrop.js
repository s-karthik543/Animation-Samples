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
import Slider from 'react-native-slider'

export default class PriceDrop extends Component {

    constructor(props) {
        super(props)
        this.minValue = 29
        this.state = {
            price: 29,
            minimumValue: 0,
            maximumValue: 191,
            timeMax: 30,
            timeMin: 0,
            timeValue: 'Immediate'
        }
    }

    render() {
        return (
            <View style={{ paddingHorizontal: 20, justifyContent: 'center', flex: 1 }}>
                <Text style={{ color: 'red', fontSize: 25 }} >
                    <Text style={{ fontSize: 16 }} >{`\u20b9`} </Text>
                    {this.state.price}
                </Text>
                <Slider
                    trackStyle={customStyles2.track}
                    thumbStyle={customStyles2.thumb}
                    minimumValue={this.state.minimumValue}
                    maximumValue={this.state.maximumValue}
                    animateTransitions={true}
                    onValueChange={(value) => {
                        this.setState({ price: parseInt(this.minValue + value) })
                    }} />

                <Text style={{ alignSelf: 'center' }}>Max. Amount you wish to pay for this ride</Text>

                <Text style={{ color: 'red', fontSize: 25, marginTop: 20 }} >
                    {this.state.timeValue}
                </Text>
                <Slider
                    trackStyle={customStyles2.track}
                    thumbStyle={customStyles2.thumb}
                    minimumValue={this.state.timeMin}
                    maximumValue={this.state.timeMax}
                    animateTransitions={true}
                    onValueChange={(value) => {
                        if (value > 0) {
                            this.setState({ timeValue: `next ${parseInt(value)} minutes` })
                        } else {
                            this.setState({ timeValue: 'Immediate' })
                        }
                    }} />

                <Text style={{ alignSelf: 'center' }}>Max. Duration to look out for cabs</Text>
            </View>
            // <Slider />
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
