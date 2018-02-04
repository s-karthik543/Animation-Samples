import React, { Component } from 'react';
import {
    View,
    Animated,
    StyleSheet
} from 'react-native';

export default class Ripple extends Component {

    state = {
        animated: new Animated.Value(1),
        opacityA: new Animated.Value(1),
        animated2: new Animated.Value(1),
        opacityA2: new Animated.Value(1)
    }

    componentDidMount() {
        const { animated, opacityA, animated2, opacityA2 } = this.state

      /*  Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 700
                }),
                Animated.timing(opacityA, {
                    toValue: 0,
                    duration: 700
                })
            ])).start()

        Animated.loop(
            Animated.parallel([
                Animated.timing(animated, {
                    toValue: 1,
                    duration: 700
                }),
                Animated.timing(opacityA, {
                    toValue: 0,
                    duration: 700
                })
            ])).start()*/

      /*  Animated.stagger(100, [
            Animated.loop(
                Animated.parallel([
                    Animated.timing(animated, {
                        toValue: 1,
                        duration: 1000
                    }),
                    Animated.timing(opacityA, {
                        toValue: 0,
                        duration: 1000
                    })
                ]))
            ,
            Animated.loop(
                Animated.parallel([
                    Animated.timing(animated2, {
                        toValue: 1,
                        duration: 1000
                    }),
                    Animated.timing(opacityA2, {
                        toValue: 0,
                        duration: 1000
                    })
                ]))
        ]).start()*/
    }

    render() {
        const { animated, opacityA, animated2, opacityA2 } = this.state


        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >


                <Animated.View style={{ transform: [{ scale: animated }], width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(153,0,0,0.05)', opacity: opacityA }} >
                    {/* <Animated.View style={{ transform: [{ scale: animated2 }], width: 100, height: 100, borderRadius: 50, backgroundColor: 'rgba(255,0,0,0.4)', opacity: opacityA2 }} /> */}
                </Animated.View>
                <View style={{ width: 10,opacity:0.5, height: 10, borderRadius: 5, backgroundColor: 'red', alignSelf: 'center', position: 'absolute' }} />

            </View>
        )
    }

}