import React, { Component } from 'react';
import {
    Platform,
    StatusBar,
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet,
    ToastAndroid,
    Dimensions
} from 'react-native';
import CollapsibleToolbar from './CollapsibleToolbar';

const { width, height } = Dimensions.get('window')

console.log("width ", width, " height ", height)

export default class CollapseDemo extends Component {

    constructor(props) {
        super(props)

        this.state = { expand: false }
    }
    componentWillMount() {
        StatusBar.setBarStyle('light-content');

        if (Platform.OS === 'android') {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.2)', true);
        }
    }

    renderContent = () => (
        <View style={{ flex: 1 }}>
            <View style={{ paddingTop: 150, backgroundColor: 'red' }} >

                <Text style={{ alignSelf: 'center', marginTop: 20, fontSize: 25, color: 'white' }} >Matching cabs for you</Text>
                {new Array(20).fill().map((_, i) => (
                    <View
                        // eslint-disable-next-line
                        key={i}
                        style={{
                            backgroundColor: 'white',
                            padding: 10,
                            borderBottomWidth: 0,
                            borderBottomColor: '#E5E5E5'
                        }}
                    >
                        <Text style={{ color: 'black' }} >{`Item ${i + 1}`}</Text>
                    </View>
                ))}

            </View>

        </View>
    );

    renderNavBar = () => (

        <View style={{ flex: 1, backgroundColor: 'red' }} >
            <View style={{ flexDirection: 'row', backgroundColor: 'red', flex: 1, paddingTop: 20, paddingBottom: 20 }} >

                <TouchableOpacity style={styles.backButton} onPress={() => ToastAndroid.show("Back ", ToastAndroid.SHORT)} >
                    <Image style={{ tintColor: 'white' }} source={require('../../assets/back_icon.png')} />
                </TouchableOpacity >

                {this.state.expand == false && <TouchableOpacity style={{ flex: 1 }} onPress={() => this.toggleExpandVisibilty(true) }>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white' }} />
                        <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 16 }}
                            numberOfLines={1} >
                            475, 1st cross, Richmond Rd
                    </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white' }} />
                        <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 16 }}
                            numberOfLines={1} >
                            Majestic bus stop
                    </Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'white' }} />
                        <Text style={{ color: 'white', fontSize: 16, marginHorizontal: 16 }}
                            numberOfLines={1} >
                            Majestic bus stop
                    </Text>
                    </View>

                </TouchableOpacity>}
                {/*   <TouchableOpacity style={styles.backButton} onPress={() => ToastAndroid.show("Back ", ToastAndroid.SHORT)} >
                    <Image style={{ tintColor: 'white' }} source={require('../../assets/back_icon.png')} />
                </TouchableOpacity > */}
            </View>

            {this.state.expand && < View style={{ height: 180, width: width }} />}
        </View>
    );

    render() {
        return (
            <CollapsibleToolbar
                renderContent={this.renderContent}
                renderNavBar={this.renderNavBar}
                imageSource='https://lorempixel.com/400/300/'
                collapsedNavBarBackgroundColor='red'
                translucentStatusBar
                isExpand={this.state.expand}
                toggleExpandVisibilty={(value)=>this.toggleExpandVisibilty(value)}
                onContentScroll={this.onContentScroll}
                renderToolBar={this.renderToolbar}
                showsVerticalScrollIndicator={false}
            // toolBarHeight={300}
            />
        );
    }

    onContentScroll = (event) => {
        console.log(event)
    }

    renderToolbar = () => {

        return (
            <View style={{ height: 300, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center' }}>

                <TouchableOpacity style={styles.backButton} onPress={() => ToastAndroid.show("Back ", ToastAndroid.SHORT)} >
                    <Image style={{ tintColor: 'white' }} source={require('../../assets/back_icon.png')} />
                </TouchableOpacity >
            </View>
        )
    }

    toggleExpandVisibilty(visibility) {
        this.setState({ expand: visibility })
    }
}

const styles = StyleSheet.create({
    backButton: {
        marginHorizontal: 16,
        borderWidth: 1,
        marginTop: 10,
        borderColor: 'white',
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
})