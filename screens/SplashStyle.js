import {StyleSheet} from 'react-native';
import COLOR from '../constant/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLOR.WHITE,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  splashLogo: {
    width: 200,
    height: 200,
    marginTop: 80,
  },
  splashWord: {
    fontSize: 24,
    marginTop: 30,
  },
});

export default styles;
