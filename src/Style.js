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
      flex: 1
    },

    buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },

    playContainer: {
      flex: 2.5,
      alignItems: 'center',
      justifyContent: 'center'
    },

    cardContainer: {
      flex: 7.5,
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
      fontSize: 16,
      textAlign: 'left',
      paddingTop: 20,
      paddingBottom: 20
    },

    scheduleCard: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 30,
      paddingRight: 30
    }

});

export default Style;
