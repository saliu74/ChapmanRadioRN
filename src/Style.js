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
      flex: 4,
      paddingTop: 10,
      paddingBottom: 50,
      paddingLeft: 10,
      paddingRight: 10
    },

    card2: {
      flex: 6,
      paddingTop: 50,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10
    }

});

export default Style;
