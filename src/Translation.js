import React, { Component } from 'react';
import {
    View,
    Animated,
    Dimensions,
    Easing,
    StatusBar
} from 'react-native'

const { width, height } = Dimensions.get('window')
console.log('Status bar height', StatusBar.currentHeight)

export default class Translation extends Component {


    constructor(props) {
        super(props)
        
        this.state = {
            moveAnimation: new Animated.Value(0),
        }
    }

    animateDownwards() {
        Animated.timing(this.state.moveAnimation, {
            toValue: height - 200 - 20,
            duration: 1500,
            easing: Easing.linear
        }).start(() => this.animateUpwards())
    }

    animateUpwards() {
        this.setState({ moveAnimation: new Animated.Value(height - 200 - 20) })
        Animated.timing(this.state.moveAnimation, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear
        }).start(() => this.animateDownwards())
    }

    componentDidMount() {
        this.animateDownwards()
    }


    render() {

        return (
            <View styel={{ flex: 1 }} >

               <Animated.View style={{
                    width: 200, height: 200, backgroundColor: 'red', transform: [
                        {
                            translateY: this.state.moveAnimation,
                        },
                    ]
                }} />
            </View>
        )
    }
}