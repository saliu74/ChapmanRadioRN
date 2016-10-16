'use strict';

import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
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
      paddingRight: 30
    },

    card2: {
      paddingTop: 20,
      paddingBottom: 30,
      paddingLeft: 30,
      paddingRight: 30
    }

});

export default Style;
