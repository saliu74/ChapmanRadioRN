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
          showJSON: "",
          showPic: "",
          showText: "",

          songJSON: "",
          songPic: "",
          songText: ""

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

      // Live Show

      if (this.state.showJSON.showname != null) {
        this.state.showPic = this.state.showJSON.pic
        this.state.showText = this.state.showJSON.showname + " featuring " + this.state.showJSON.djs + ": " + this.state.showJSON.description
      }

      console.log((this.state.showPic).slice(2))

      // Song

      if (this.state.songJSON != null) {
        this.state.songPic = this.state.songJSON.img200
        this.state.songText = this.state.songJSON.track + " by " + this.state.songJSON.artist
      }

      // Automation

      if (this.state.showJSON.showname == null) {
        this.state.showText = "Automation"
        this.state.songText = "Automation"
      }

      return (
            <View style={Style.rootContainer}>
                <View style={Style.playContainer}>
                  <PlayButton/>
                </View>
                <ScrollView style={Style.cardContainer}>
                  <View style={Style.card1}>
                    <View style={theme.cardStyle}>
                      <Image source={{uri : ""}} style={Style.cardImageStyle} />
                      <Text style={theme.cardContentStyle}>
                        {this.state.showText}
                      </Text>
                    </View>
                  </View>
                  <View style={Style.card2}>
                    <View style={theme.cardStyle}>
                      <Image source={{uri : this.state.songPic}} style={theme.cardImageStyle} />
                      <Text style={theme.cardContentStyle}>
                        {this.state.songText}
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
        this.setState({songJSON: responseData.nowplaying});
        this.setState({showJSON: responseData.show});
      })
      .done();
  }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);
