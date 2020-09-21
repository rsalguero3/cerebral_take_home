import React, {Component} from 'react';
import {View} from 'react-native';
import ChatBot from 'react-native-chatbot';
import PropTypes from 'prop-types';

export default class OnboardingScreen extends Component {
  constructor(props) {
    super(props);
    //receive the onboarding question from navigation prop sent from the Splash Screen
    const {questions} = props.route.params;
    this.state = {
      onboardingQuestions: questions,
    };
  }

  render() {
    const {onboardingQuestions} = this.state;
    return (
      <View>
        <ChatBot
          steps={onboardingQuestions}
          hideBotAvatar={true}
          hideUserAvatar={true}
        />
      </View>
    );
  }
}
OnboardingScreen.propTypes = {
  route: PropTypes.object,
};
