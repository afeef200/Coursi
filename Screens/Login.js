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
  Keyboard,
  Animated,
  Dimensions,
  UIManager,
} from 'react-native';

import Constants from 'expo-constants';
import firebase from 'firebase';
import Header from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Expo from 'expo';
import * as Facebook from 'expo-facebook';

const { State: TextInputState } = TextInput;

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

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  GoToSignup = () => {
    this.nav('Signup', {});
  };

  GoToHome = () => {
    this.nav('Home', { username: this.state.TextInputEmail1 });
  };

  _storeData = async (key, value) => {
    try {
      AsyncStorage.setItem(key, value);
    } catch (error) {
      alert(error);
    }
  };

  saveData() {
    this._storeData('username', this.state.TextInputEmail1);
  }

  signInWithFacebook = async () => {
    const appId = Expo.Constants.manifest.extra.facebook.appId;
    const permissions = ['public_profile', 'email']; // Permissions required, consult Facebook docs

    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      appId,
      { permissions }
    );

    switch (type) {
      case 'success': {
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL); // Set persistent auth state
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        const facebookProfileData = await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential);
        // Sign in with Facebook credential

        // Do something with Facebook profile data
        // OR you have subscribed to auth state change, authStateChange handler will process the profile data

        return Promise.resolve({ type: 'success' });
      }

      case 'cancel': {
        return Promise.reject({ type: 'cancel' });
      }
    }
  };

  async logIn() {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('2267718170207307', {
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(() => {
            this.nav('Home');
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  // async  logIn() {
  //   const{type,token}= await Facebook.logInWithReadPermissionsAsync('2267718170207307', {
  //       permissions: ['public_profile','email'],
  //     });

  //     if (type === 'success') {
  //       const credential = firebase.auth.FacebookAuthProvider.credential(token)

  //       firebase.auth().signInWithCredential(credential).catch((error) => {
  //         console.log(error)
  //       })
  //     }
  // }

  SignIn = (email, password) => {
    this.setState({ error: '', loading: true });

    const { TextInputEmail1, TextInputPass1 } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        const emailVerified = user.emailVerified;
        if (emailVerified == true) {
          this.saveData();
          this.setState({ error: '', loading: false });
          this.GoToHome();
        } else {
          firebase.auth().signOut();
          this.setState({ error: 'Verify your Email.', loading: false });
        }
      })
      .catch(() => {
        this.setState({ error: 'Authentication failed1.', loading: false });
      });
  };
  // renderButtonOrSpinner() {
  //   if (this.state.loading) {
  //     return <Spinner />;
  //   }
  //   return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  // }
  render() {
    const { shift } = this.state;
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
        <TextInput
          placeholder="  Enter Email"
          underlineColorAndroid="transparent"
          style={styles.Textinput}
          onChangeText={text => this.setState({ TextInputEmail1: text })}
        />

        <TextInput
          placeholder="  Enter Password"
          underlineColorAndroid="transparent"
          style={styles.Textinput}
          secureTextEntry={true}
          onChangeText={text => this.setState({ TextInputPass1: text })}
        />

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 5,
            marginTop: 25,
            backgroundColor: '#4F92A7',
            borderWidth: 2,
            borderColor: '#4F92A7',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 20,
            marginRight: 20,
            marginLeft: 20,
          }}
          onPress={() =>
            this.SignIn(this.state.TextInputEmail1, this.state.TextInputPass1)
          }>
          <Text style={{ color: 'white', fontSize: 16, padding: 0 }}>
            Login
          </Text>
        </TouchableOpacity>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 5,
            marginTop: 25,
            backgroundColor: '#4F92A7',
            borderWidth: 2,
            borderColor: '#4F92A7',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 20,
            marginRight: 20,
            marginLeft: 20,
          }}
          onPress={this.logIn}>
          <Text style={{ color: 'white', fontSize: 16, padding: 0 }}>
            Login With Facebook
          </Text>
        </TouchableOpacity>

        <View style={styles.bottom}>
          <Text
            style={{
              textAlign: 'center',
              margin: 20,
              fontSize: 17,
              marginBottom: 5,
            }}>
            ______________or______________
          </Text>

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
            onPress={this.GoToSignup}>
            <Text style={{ color: '#4F92A7', fontSize: 16 }}>
              {' '}
              Create New Account{' '}
            </Text>
          </TouchableOpacity>
        </View>
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
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },

  // button: {
  //   marginRight: 50,
  //   marginLeft: 50,
  // },
});
