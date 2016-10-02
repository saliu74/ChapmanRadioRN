'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import Style from './Style';

class ChapmanRadioRN extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        return (
            <View style={Style.rootContainer}>
                <View style={Style.playContainer}>
                    <Text style={Style.displayText}>Hello</Text>
                </View>
                <View style={Style.infoContainer}>
                </View>
            </View>
        )
    }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);