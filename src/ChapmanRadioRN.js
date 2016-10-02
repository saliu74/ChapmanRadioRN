'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    AppRegistry
} from 'react-native';

import Style from './Style';

// https://github.com/xinthink/react-native-material-kit
import {
  MKColor,
  MKButton,
} from 'react-native-material-kit';

const PlayButton = MKButton.coloredFab()
  .withStyle(Style.fab)
  .withText('PLAY')
  .withBackgroundColor(MKColor.Teal)
  .withStyle({
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.4,
        shadowColor: 'black',
        elevation: 4,
  })
  .withTextStyle(Style.buttonText)
  .withOnPress(() => {
    console.log('hi, raised button!');
  })
  .build();

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