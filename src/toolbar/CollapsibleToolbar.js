import React, { Component } from 'react';
import {
    Animated,
    Image,
    Dimensions,
    Platform,
    Text,
    StatusBar,
    StyleSheet,
    View,
    TouchableOpacity,
    ToastAndroid
} from 'react-native';
import PropTypes, { element } from 'prop-types';
const { width, height } = Dimensions.get('window')
const DEFAULT_TOOLBAR_HEIGHT = 300;

export default class CollapsibleToolbar extends Component {
    static propTypes = {
        collapsedNavBarBackgroundColor: PropTypes.string,
        imageSource: PropTypes.string,
        onContentScroll: PropTypes.func,
        renderContent: PropTypes.func.isRequired,
        renderNavBar: PropTypes.func.isRequired,
        renderToolBar: PropTypes.func,
        toolBarHeight: PropTypes.number,
        translucentStatusBar: PropTypes.bool
    };

    static defaultProps = {
        collapsedNavBarBackgroundColor: '#FFF',
        imageSource: '',
        onContentScroll: undefined,
        renderToolBar: undefined,
        toolBarHeight: DEFAULT_TOOLBAR_HEIGHT,
        translucentStatusBar: false
    };

    constructor(props) {
        super(props);

        const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
        const ANDROID_STATUS_BAR_HEIGHT = props.translucentStatusBar ? StatusBar.currentHeight : 0;

        this.statusBarHeight = Platform.OS === 'ios' ? 20 : ANDROID_STATUS_BAR_HEIGHT;
        this.navBarHeight = 130//APPBAR_HEIGHT + this.statusBarHeight;
        this.maxScrollableHeight = props.toolBarHeight - this.navBarHeight;

        const inputRange1 = [this.maxScrollableHeight - 10, this.maxScrollableHeight+30];
        const inputRange2 = [this.maxScrollableHeight - 0.1, this.maxScrollableHeight];

        const infoRnge = [200, 210];

        console.log("input range 1 ", inputRange1)
        console.log("input range 2 ", inputRange2)
        console.log("infoRnge range  ", infoRnge)


        this.scrollOffsetY = new Animated.Value(0);
        this.toolbar = new Animated.Value(0)

        this.infoBarOpacity = this.scrollOffsetY.interpolate({
            inputRange: infoRnge,
            outputRange: [1, 0]
        });

        this.toolbarOverlayTranslate = this.scrollOffsetY.interpolate({
            inputRange: [0, 75],
            outputRange: [0, -30]
        });

        this.toolbarTranslate = this.toolbar.interpolate({
            inputRange: [0, 150],
            outputRange: [-250, 0]
        });

        this.toolBarOpacity = this.scrollOffsetY.interpolate({
            inputRange: inputRange1,
            outputRange: [1, 0]
        });

        this.toolBarOverlayOpacity = this.scrollOffsetY.interpolate({
            inputRange: inputRange1,
            outputRange: [0, 1]
        });

        this.navBarOpacity = this.scrollOffsetY.interpolate({
            inputRange: infoRnge,
            outputRange: [0, 1]
        });

        this.navBarOverlayOpacity = this.scrollOffsetY.interpolate({
            inputRange: infoRnge,
            outputRange: [1, 0]
        });

        // this.state = {
        //     postionY: 0
        // }
    }

    componentWillMount() {
        this.scrollOffsetY.addListener(({ value }) => {
            console.log("Value ", value)
            if (value > 150) {
                this.toolbar.setValue(150)
            } else {
                this.toolbar.setValue(value)
            }
            // this._value = value
            if (this.props.isExpand) {
                this.props.toggleExpandVisibilty(false)
            }

        });
    }

    render() {

        console.log("Render")
        const {
            collapsedNavBarBackgroundColor,
            imageSource,
            onContentScroll,
            renderContent,
            renderNavBar,
            renderToolBar,
            toolBarHeight,
            ...props
        } = this.props;

        if (!renderToolBar && !imageSource) {
            // eslint-disable-next-line no-console
            console.error('Either an image source or a custom toolbar component must be provided');
        }

        return (
            <View style={styles.container}>
                <Animated.ScrollView
                    onLayout={(e) => {
                        console.log("Native ", e.nativeEvent)
                    }}
                    {...props}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.scrollOffsetY } } }],
                        {
                            useNativeDriver: true,
                            // listener:
                        }
                    )}
                >
                    <Animated.View
                        style={[
                            styles.toolBarOverlay,
                            {
                                // backgroundColor: collapsedNavBarBackgroundColor,
                                height: toolBarHeight,
                                opacity: this.toolBarOverlayOpacity
                            }
                        ]}
                    />

                    <Animated.View style={{ opacity: this.toolBarOpacity, elevation: 10 }}>
                        {renderToolBar
                            ? renderToolBar()
                            : <Image
                                source={{ uri: imageSource || '' }}
                                style={{ height: toolBarHeight }}
                            />
                        }
                    </Animated.View>

                    <Animated.View style={{ opacity: this.infoBarOpacity, height: 200, width: width - 40, marginHorizontal: 20, position: 'absolute', top: 250, backgroundColor: 'white', elevation: 10, borderRadius: 20 }} />


                    {renderContent()}
                </Animated.ScrollView>

                <Animated.View
                    style={[
                        styles.navBarContainer,
                        {
                            backgroundColor: collapsedNavBarBackgroundColor,
                            // height: this.navBarHeight,
                            opacity: this.navBarOpacity,
                            paddingTop: this.statusBarHeight,
                            transform: [{ translateY: this.toolbarTranslate }]
                        }
                    ]}
                >
                    {renderNavBar()}
                </Animated.View>

                <Animated.View
                    style={[
                        styles.navBarOverlay,
                        {
                            height: this.navBarHeight,
                            opacity: this.navBarOverlayOpacity,
                            paddingTop: this.statusBarHeight,
                            // transform: [{ translateY: this.toolbarOverlayTranslate }]
                        }
                    ]}
                >
                    {this.renderNavBar()}
                </Animated.View>
                {this.props.isExpand &&
                    <View style={{ height: 200, width: width - 40, marginHorizontal: 20, paddingVertical: 16, position: 'absolute', top: 120, backgroundColor: 'white', elevation: 10, borderRadius: 20, opacity: 0.98 }} >

                        <View style={{ marginHorizontal: 16 }}>
                            <Text>PICKUP LOCATION</Text>
                            <Text>475, 1st cross, Richmond Rd,</Text>
                        </View>
                    </View>
                }

            </View>
        );
    }

    renderNavBar() {
        return (<View style={{ flexDirection: 'row', flex: 1, paddingTop: 20 }} >

            <TouchableOpacity style={styles.backButton} onPress={() => {
                console.log("Y pos ", this.scrollOffsetY._value)
                ToastAndroid.show("Back ", ToastAndroid.SHORT)
            }} >
                <Image style={{ tintColor: 'black' }} source={require('../../assets/back_icon.png')} />
            </TouchableOpacity >
        </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    toolBarOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0
    },
    navBarContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOpacity: 0.1,
                shadowRadius: StyleSheet.hairlineWidth,
                shadowOffset: {
                    height: StyleSheet.hairlineWidth
                },
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: 'rgba(0, 0, 0, .3)'
            },
            android: {
                elevation: 5
            }
        })
    },
    navBarOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        position: 'absolute',
        left: 0,

        // right: 0
    },
    backButton: {
        marginHorizontal: 16,
        marginTop: 10,
        // borderWidth: 1,
        backgroundColor: 'white',
        elevation: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    }
});