'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import Style from './Style';
import PlayButton from './playButton';

class ChapmanRadioRN extends Component {

    constructor(props) {
        super(props);

        this.state = {
            
        }
    }
  
    render() {
        return (
            <View style={Style.rootContainer}>
                <PlayButton/>
            </View>
        )
    }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);