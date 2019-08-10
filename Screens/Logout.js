import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';

import Constants from 'expo-constants';
import firebase from 'firebase';
import Header from 'react-native-elements';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputEmail1: '',
      TextInputPass1: '',
      error: '',
      loading: false,
    };
  }
  nav = this.props.navigation.navigate;

  GoToLogin = () => {
     this.setState({ error: '', loading: true });
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ error: '', loading: false });
        this.nav('Login', {});
        // Sign-out successful.
      })
      .catch(() => {
        this.setState({ error: 'Authentication failed.', loading: false });
        // An error happened.
      });
  };

  render() {
    return (
      <View
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}>
        <Image
          source={require('Images/coursi.png')}
          style={{
            marginTop: 100,
            marginBottom: 100,
            width: 280,
            height: 80,
            alignSelf: 'center',
          }}
        />

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginTop: 15,

            backgroundColor: '#ecf0f1',

            borderWidth: 2,
            borderColor: '#4F92A7',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 20,
            marginRight: 20,
            marginLeft: 20,
          }}
          onPress={this.GoToLogin}>
          <Text style={{ color: '#4F92A7', fontSize: 16 }}>
            {' '}
            Are You Sure You Want Logout{' '}
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

  Textinput: {
    height: 40,
    margin: 9,
    borderColor: 'gray',
    borderWidth: 0.3,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },

  // button: {
  //   marginRight: 50,
  //   marginLeft: 50,
  // },
});
