'use strict';

import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },

    scheduleRootContainer: {
      flex: 1,
      alignItems: 'flex-start'
    },

    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },

    playContainer: {
      flex: 2.9,
      alignItems: 'center',
      justifyContent: 'center'
    },

    cardContainer: {
      flex: 7.1,
      flexDirection: 'column'
    },

    card1: {
      paddingBottom: 20,
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 5
    },

    card2: {
      paddingTop: 20,
      paddingBottom: 30,
      paddingLeft: 30,
      paddingRight: 30
    },

    cardImageStyle: {
      flex: 1,
      height: 170,
      resizeMode: 'contain'
    },

    scheduleContainer: {
      flex: 1
    },

    sectionHead: {
      fontSize: 22,
      fontWeight: '200',
      textAlign: 'center',
      backgroundColor: '#f2f2f2',
      color: '#0f0f0f',
      paddingTop: 20,
      paddingBottom: 20
    },

    scheduleCard: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 30,
      paddingRight: 30
    },

    discardCard: {
      height: 0
    },

    searchField: {
      height: 40,
      width: 500
    }

});

export default Style;
