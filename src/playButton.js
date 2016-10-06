// https://github.com/xinthink/react-native-material-kit
import {
  MKColor,
  MKButton,
} from 'react-native-material-kit';
import Style from './Style';

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

export default PlayButton