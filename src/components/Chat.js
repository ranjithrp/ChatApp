import React from 'react';

import {GiftedChat} from 'react-native-gifted-chat';

import {
    View
} from 'react-native';

import {
    Header
} from 'react-native-elements';

import Backend from '../Backend';

export class Chat extends React.Component {
  static navigationOptions = ({ navigation }) => ({
            title: `${navigation.state.params.title}`
        })

  state = {
    messages: [],
  };
  componentWillMount() {

  }
  render() {
    return (
        <GiftedChat
            messages={this.state.messages}
            onSend={(message) => {
            Backend.sendMessage(message);
            }}
            user={{
            _id: Backend.getUid(),
            //name: this.props.name,
            }}
        />
    );
  }
  componentDidMount() {
    console.log(this.props.navigation.state.params._id)
    Backend.loadMessages(this.props.navigation.state.params._id, (message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}