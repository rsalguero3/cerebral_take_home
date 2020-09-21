import React, {Component} from 'react';
import {StatusBar, View} from 'react-native';
import styles from './SplashStyle';
import SplashLogo from '../assets/svg/SplashLogo';
import COLOR from '../constant/colors';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLOR.WHITE} barStyle="dark-content" />
        <View style={styles.splashLogo}>
          <SplashLogo width={200} height={200} />
        </View>
      </View>
    );
  }
}
