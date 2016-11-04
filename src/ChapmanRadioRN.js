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

import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar
} from 'react-native-scrollable-tab-view';

import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming';
const url = "http://198.175.251.242/listen";

// Play button specifics

const PlayButton = MKButton.coloredFab()
  .withStyle({
      width: 100,
      height: 100
   })
  .withBackgroundColor('#92f7fc')
  .withStyle({
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.4,
        shadowColor: 'black',
        elevation: 4
  })
  .build();

class ChapmanRadioRN extends Component {

    constructor(props) {
        super(props);

        this.state = {
          playButtonLabel: "PLAY",
          showJSON: "",
          showPic: ".",
          showText: "",

          songJSON: "",
          songPic: ".",
          songText: ""

        }
    }

    render() {

      // Card specifics

      const theme = getTheme();

      return (
            <View style={Style.rootContainer}>
              <ScrollableTabView
                style={{marginTop: 20, }}
                initialPage={0}
                renderTabBar={() => <ScrollableTabBar />}
              >
                <View tabLabel='Player' style={Style.rootContainer}>


                  <View style={Style.playContainer}>
                  <PlayButton
                    onPress={() => {
                      this._onPlayButtonPressed();
                    }}
                  >
                    <Text style={Style.buttonText}>{this.state.playButtonLabel}</Text>
                  </PlayButton>
                  </View>
                  <ScrollView style={Style.cardContainer}>
                    <View style={Style.card1}>
                      <View style={theme.cardStyle}>
                        <Image source={{uri : this.state.showPic}} style={Style.cardImageStyle} />
                        <Text style={theme.cardContentStyle}>
                          {this.state.showText}
                        </Text>
                      </View>
                    </View>
                    <View style={Style.card2}>
                      <View style={theme.cardStyle}>
                        <Image source={{uri : this.state.songPic}} style={Style.cardImageStyle} />
                        <Text style={theme.cardContentStyle}>
                          {this.state.songText}
                        </Text>
                      </View>
                    </View>
                </ScrollView>


              </View>
                <Text tabLabel='Schedule'/>
              </ScrollableTabView>
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
      this.refresh()
      setInterval(() => {
        this.refresh()
      }, 10000)
    }

    componentDidMount() {

    }

    refresh() {

      fetch("http://api.chapmanradio.com/legacy/livestreams.json")
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({songJSON: responseData.nowplaying});
          this.setState({showJSON: responseData.show});
        })
        .done();

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // Live Show

      if (this.state.showJSON.showname != null) {

        this.setState({

          showPic: "https://" + (this.state.showJSON.pic).slice(2),
          showText: this.state.showJSON.showname + " featuring " + this.state.showJSON.djs + ": " + this.state.showJSON.description

        });

      }

      // Song

      if (this.state.songJSON.track != null) {

        this.setState({

          songPic: this.state.songJSON.img200,
          songText: this.state.songJSON.track + " by " + this.state.songJSON.artist

        });

      }

      if (this.state.songJSON.track == null && this.state.songJSON.type != "talk") {

        this.setState({

          songText: "No song playing currently",
          songPic: "."

        });

      }

      if (this.state.songJSON.type == "talk") {

        this.setState({

          songPic: "https://chapmanradio.com" + this.state.songJSON.img200,
          songText: "Topic: " + this.state.songJSON.text

        });

      }

      // Automation

      if (this.state.showJSON.showname == null) {

        this.setState({

          showText: "Automation",
          songText: "Automation",
          showPic: ".",
          songPic: "."

        });

      }
    }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);
