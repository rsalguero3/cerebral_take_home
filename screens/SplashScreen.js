import React, {Component} from 'react';
import {StatusBar, Text, View, Button} from 'react-native';
import OnboardingRepository from '../onboarding/OnboardingRepository';
import styles from './SplashStyle';
import SplashLogo from '../assets/svg/SplashLogo';
import COLOR from '../constant/colors';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.onboardingRepository = OnboardingRepository.getInstance();
    this.state = {
      hideError: true,
      errorMessage: '',
    };
    this.fetchQuestions = this.fetchQuestions.bind(this);
  }

  fetchQuestions() {
    this.setState({
      hideError: true,
    });
    this.onboardingRepository
      .getOnboardingQuestions()
      .then((questions) => {
        this.props.navigation.navigate('OnboardingScreen', {questions});
      })
      .catch((error) => {
        this.setState({hideError: false, errorMessage: error.toString()});
      });
  }
  componentDidMount() {
    this.fetchQuestions();
  }

  render() {
    const {hideError, errorMessage} = this.state;
    const display = hideError ? 'none' : 'flex';

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={COLOR.WHITE} barStyle="dark-content" />
        <View style={styles.splashLogo}>
          <SplashLogo width={200} height={200} />
        </View>
        <View style={{display}}>
          <Text>{errorMessage}</Text>
          <Button
            onPress={this.fetchQuestions}
            title="Try Again"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    );
  }
}
