'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    Image,
    ScrollView,
    AppRegistry
} from 'react-native';

import Style from './Style';
import {
  MKColor,
  MKButton,
  getTheme
} from 'react-native-material-kit';

import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
const url = "http://198.175.251.242/listen";

class ChapmanRadioRN extends Component {

    constructor(props) {
        super(props);

        this.state = {
          playButtonLabel: "PLAY",
          show: ""
        }
    }

    render() {

      // Play button specifics

      const {playButtonLabel} = this.state
      const PlayButton = MKButton.coloredFab()
        .withStyle({
            width: 100,
            height: 100
         })
        .withText(this.state.playButtonLabel)
        .withBackgroundColor(MKColor.Cyan)
        .withStyle({
              shadowRadius: 8,
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

      // Card specifics

      const theme = getTheme();
      var base64Icon = 'https://www.petdrugsonline.co.uk/images/page-headers/cats-master-header';

      // Live Show json

      console.log(this.show)

      return (
            <View style={Style.rootContainer}>
                <View style={Style.playContainer}>
                  <PlayButton/>
                </View>
                <ScrollView style={Style.cardContainer}>
                  <View style={Style.card1}>
                    <View style={theme.cardStyle}>
                      <Image source={{uri : base64Icon}} style={theme.cardImageStyle} />
                      <Text style={theme.cardTitleStyle}>Welcome</Text>
                      <Text style={theme.cardContentStyle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sagittis pellentesque lacus eleifend lacinia...
                      </Text>
                    </View>
                  </View>
                  <View style={Style.card2}>
                    <View style={theme.cardStyle}>
                      <Image source={{uri : base64Icon}} style={theme.cardImageStyle} />
                      <Text style={theme.cardTitleStyle}>Welcome</Text>
                      <Text style={theme.cardContentStyle}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris sagittis pellentesque lacus eleifend lacinia...
                      </Text>
                    </View>
                  </View>
              </ScrollView>
            </View>
        )
    }

    _onPlayButtonPressed() {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      if (this.state.playButtonLabel == "PLAY") {
        ReactNativeAudioStreaming.play(url);
        this.setState({
            playButtonLabel: "PAUSE"
        })
      }
      else {
        ReactNativeAudioStreaming.pause();
        this.setState({
            playButtonLabel: "PLAY"
        })
      }
    }

    componentWillMount() {
    fetch("http://api.chapmanradio.com/legacy/livestreams.json")
      .then((response) => response.json())
      .then((responseData) => {
        console.log('a');
        this.setState({show: responseData.nowplaying});
      })
      .done();
  }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);
