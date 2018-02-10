import React, { Component } from 'react';
import {
    Image,
    NetInfo,
} from 'react-native';

export default class ImageHolder extends Component {

    constructor(props) {
        super(props)

        this.state = { status: 2 }

        // this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this)
    }
    componentDidMount() {
        this.downloadImage()

        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );

    }

    downloadImage() {
        const uri = this.props.source.uri;
        Image.prefetch(uri).then(() => {
            this.setState({
                status: 1
            });
        }, error => {
            this.setState({
                status: 2
            })
        })
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener(
            'connectionChange'
        );
    }


    handleFirstConnectivityChange = (isConnected) => {
        console.log("Status", this.state.status)

        console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
        if (this.state.status == 2 && isConnected) {
            this.downloadImage()
        }
    }

    render() {
        const { children, source, defaultSource } = this.props;
        let imageSource, defaultStyle;
        switch (this.state.status) {
            case 1:
                {
                    imageSource = source;
                }
                break;
            case 2:
                {
                    imageSource = defaultSource;
                }
                break;
        }

        return (
            <Image
                {...this.props}
                style={this.props.style}
                source={imageSource}>
                {children}
            </Image>
        );
    }
}