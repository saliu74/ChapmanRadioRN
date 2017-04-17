'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    LayoutAnimation,
    Image,
    ScrollView,
    TextInput,
    AppRegistry
} from 'react-native';

import Style from './Style';
import {
  MKColor,
  MKButton,
  getTheme
} from 'react-native-material-kit'; // My UI components - the play button and show/schedule cards

import ScrollableTabView, {
  ScrollableTabBar,
  DefaultTabBar
} from 'react-native-scrollable-tab-view'; // My 2 tab interface - Player/Schedule

import { ReactNativeAudioStreaming, Player } from 'react-native-audio-streaming'; // The library I used to stream the audio
const url = "http://198.175.251.242/listen";

// Play button specifics

const PlayButton = MKButton.coloredFab()
  .withStyle({
      width: 100,
      height: 100
   })
  .withBackgroundColor('#A8D689')
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
          playButtonLabel: " PLAY ", // the spaces around play indicate that this is the first time the user opened the app, they aren't reopening it after minimizing
          showJSON: "",
          showPic: ".",
          showText: "",

          songJSON: "",
          songPic: ".",
          songText: "",

          scheduleArray: [],
          scheduleView: <View></View>,

          oldSongJSON: "",
          oldShowJSON: "",

        }
    }

    render() {

      //console.log("RENDER")

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

                  {/* The Player tab */}
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
                    {/* Show card */}
                    <View style={Style.card1}>
                      <View style={theme.cardStyle}>
                        <Image source={{uri : this.state.showPic}} style={Style.cardImageStyle} />
                        <Text style={theme.cardContentStyle}>
                          {this.state.showText}
                        </Text>
                      </View>
                    </View>
                    {/* Song card */}
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


              <View tabLabel='Schedule' style={Style.scheduleRootContainer}>
                {/* Search Bar */}
                <TextInput
                  style={Style.searchField}
                  onChangeText={(text) => this.makeSchedule(text)}
                  value={this.state.text}
                  placeholder="Search..."
                  underlineColorAndroid='transparent'
                />
                <ScrollView style={Style.scheduleContainer}>
                  {/* Dynamically created list of schedule cards */}
                  {this.state.scheduleView}
                </ScrollView>
              </View>


              </ScrollableTabView>
            </View>
        )
    }

    _onPlayButtonPressed() {
      // Adds a nice animation
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      // If it's the first time the user opened the app and played the stream
      if (this.state.playButtonLabel == " PLAY ") {
        ReactNativeAudioStreaming.stop();
        ReactNativeAudioStreaming.play(url, {showIniOSMediaCenter: true, showInAndroidNotifications: true});
        this.setState({
            playButtonLabel: "PAUSE"
        })
      }
      // If the user is reopening the app after minimizing and playing the stream
      else if (this.state.playButtonLabel == "PLAY") {
        ReactNativeAudioStreaming.resume();
        this.setState({
          playButtonLabel: "PAUSE"
        })
      }
      // If the user is unpausing the stream at any point in use
      else {
        ReactNativeAudioStreaming.pause();
        this.setState({
            playButtonLabel: "PLAY"
        })
      }
    }

    // Populate the schedule and set a timer to refresh the show every 1000 milliseconds
    componentWillMount() {
      this.getSchedule()
      setInterval(() => {
        this.refresh()
      }, 1000)
    }

    componentDidMount() {



    }

    // Populates scheduleView with views to create schedule scroll view with material cards
    makeSchedule(searchStr) {

      const theme = getTheme();
      var evens = true

      // If the user didn't search anything, and we're just populating the schedule for the first time
      if (searchStr == "") {

          // Takes in a bunch
          var contents = this.state.scheduleArray.map(function (item) {

              // If we need a new section head, ie a weekday
            	if (evens) {
                evens = false

                return (
                  <Text style={Style.sectionHead} key={Math.random()}>{item}</Text>
                );
              }
              // If we're populating schedule cards, not a section head (weekday)
            	else {
                evens = true

                // Item is a list of traits for a scheduled show, title, description, image link, etc.
                var contentsTemp = item.map(function (item) {
                  var scheduleText = "(" + item[3] + ") " + item[2] + ": " + item[1] + " (" + item[4] + ")"
                  // Dynamically create a schedule card with our item
                  // Each card NEEDS a unique key so we use Math.random()
                  return (
                    <View style={Style.scheduleCard} key={Math.random()}>
                      <View style={theme.cardStyle}>
                        <Image source={{uri : "https://" + (item[7]).slice(2)}} style={Style.cardImageStyle} />
                        <Text style={theme.cardContentStyle}>
                          {scheduleText}
                        </Text>
                      </View>
                    </View>
                  );
                });
                return (
                  contentsTemp
                );
              }
           });

     } else { // If the user searched something

       var contents = this.state.scheduleArray.map(function (item) {

         if (evens) { // Ignore this, there are no section heads in search results
           evens = false
         }

         else {
           evens = true

           var contentsTemp = item.map(function (item) {
             // Item is a list of traits for a scheduled show, title, description, image link, etc.
             if ((item[1] + item[2] + item[3]).toLowerCase().includes(searchStr.toLowerCase())) {

               var scheduleText = "(" + item[3] + ") " + item[2] + ": " + item[1] + " (" + item[4] + ")"
               // Dynamically create a schedule card with our item
               // Each card NEEDS a unique key so we use Math.random()
               return (
                 <View style={Style.scheduleCard} key={Math.random()}>
                   <View style={theme.cardStyle}>
                     <Image source={{uri : "https://" + (item[7]).slice(2)}} style={Style.cardImageStyle} />
                     <Text style={theme.cardContentStyle}>
                       {scheduleText}
                     </Text>
                   </View>
                 </View>
               );

             }

             else {
               // Since we still need to return a card if it doesn't fall into the search results...
               // We return a discarded card with height 0 (see Style.js)
               return (
                 <View style={Style.discardCard} key={Math.random()}>
                 </View>
               );


             }


             });


           }

             //end of contentsTemp, return this given section head/card/discardCard
             return (
               contentsTemp
             );

        });

     }
       // This actually creates the schedule using all our dynamically generated components
       this.state.scheduleView = contents

    }

    getSchedule() {

      // Grabs the schedule JSON data and populates the schedule for the first time
      fetch("https://api.chapmanradio.com/legacy/schedule.json")
        .then((response) => response.json())
        .then((responseData) => {

          for (var i in responseData) {
            this.state.scheduleArray.push(responseData[i].title) // Title is the day of the week
            this.state.scheduleArray.push(responseData[i].data)
          }

          this.makeSchedule("")

        })
        .done();

    }

    refresh() { // Refresh the live player view

      fetch("http://api.chapmanradio.com/legacy/livestreams.json")
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({oldSongJSON: this.state.songJSON})
          this.setState({oldShowJSON: this.state.showJSON})
          this.setState({songJSON: responseData.nowplaying});
          this.setState({showJSON: responseData.show});

          // If the show changed
          if (this.state.oldShowJSON != this.state.showJSON) {

            // Live Show

            if (this.state.showJSON.showname != null) {

              this.setState({

                showPic: "https://" + (this.state.showJSON.pic).slice(2),
                showText: "\"" + this.state.showJSON.showname + "\" featuring " + this.state.showJSON.djs + ": " + this.state.showJSON.description

              });

            }

            // Automation, no show+song

            if (this.state.showJSON.showname == null) {

              this.setState({

                showText: "                  Automation                  ",
                songText: "                  Automation                  ",
                songPic: "https://chapmanradio.com/img/tracks/!default/200.png",
                showPic: "https://chapmanradio.com/img/tracks/!default/200.png"

              });

            }

          }

        // New song
        if (this.state.oldSongJSON != this.state.songJSON && this.state.showJSON.showname != null) {

          // Song

          if (this.state.songJSON.track != null) {

            this.setState({

              songPic: this.state.songJSON.img200,
              songText: "\"" + this.state.songJSON.track + "\" by " + this.state.songJSON.artist

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

              songPic: "https://chapmanradio.com/img/tracks/!default/200.png",
              songText: "Topic: " + this.state.songJSON.text

            });

          }

        }

        })
        .done();

        // Gets the stream status, sets the play button label dynamically
        ReactNativeAudioStreaming.getStatus((err,r) =>
        {
          if ((r.status == "STOPPED"|| r.status == "PAUSED") && this.state.playButtonLabel == "PAUSE")
          {
            this.setState({
                playButtonLabel: "PLAY"
            })
          }
          if (r.status == "PLAYING" && this.state.playButtonLabel == "PLAY")
          {
            this.setState({
                playButtonLabel: "PAUSE"
            })
          }
          if (r.status == "PLAYING" && this.state.playButtonLabel == " PLAY ")
          {
            this.setState({
                playButtonLabel: "PAUSE"
            })
          }
        }
        )

      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
      // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);

    }

}

AppRegistry.registerComponent('ChapmanRadioRN', () => ChapmanRadioRN);
