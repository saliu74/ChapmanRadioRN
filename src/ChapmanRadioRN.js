'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    AppRegistry
} from 'react-native';

import Style from './Style';
import {
  MKColor,
  MKButton,
} from 'react-native-material-kit';

class ChapmanRadioRN extends Component {

    constructor(props) {
        super(props);

        this.state = {
          playButtonLabel: "PLAY",
        }
    }
  
    render() {
      
      const {playButtonLabel} = this.state
      const PlayButton = MKButton.coloredFab()
        .withStyle({
            width: 100,
            height: 100,
         })
        .withText(this.state.playButtonLabel)
        .withBackgroundColor(MKColor.Blue)
        .withStyle({
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 0.5 },
              shadowOpacity: 0.4,
              shadowColor: 'black',
              elevation: 4
        })
        .withTextStyle(Style.buttonText)
        .withOnPress(() => {
          this._onPlayButtonPressed()
        })
        .build();
      
      return (
            <View style={Style.rootContainer}>
                <PlayButton/>
            </View>
        )
    }
  
    _onPlayButtonPressed() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (this.state.playButtonLabel == "PLAY") {
        this.setState({
            playButtonLabel: "PAUSE"
        })
      }
      else {
        this.setState({
            playButtonLabel: "PLAY"
        })
      }
    }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);