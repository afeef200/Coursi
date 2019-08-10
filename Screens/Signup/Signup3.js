import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import Constants from 'expo-constants';
import firebase from 'firebase';

export default class SignUp3 extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      isDateTimePickerVisible: false,
      TextInputEmail: '',
      TextInputPass: '',
      TextInputNumber: '',
      error: '',
      loading: false,
    };
  }

  nav = this.props.navigation.navigate;
  GoToSignup1 = () => {
    this.nav('Signup1', {});
  };

  publish = (firstname, lastname, gender, Email, Pass, number) => {
    const posts = firebase.database().ref('Profiles');
    posts.push({
      LastName: lastname,
      Gender: gender,
      Email: Email,
      Password: Pass,
      Phone_Number: number,
      FirstName: firstname,
      Admin: false,
      Owner: false,
      Tutors: [''],
    });
  };

  EmailVerification = () => {
    this.setState({ error: '', loading: true });
    firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(function() {
        // Email sent.
        this.setState({ error: '', loading: false });
      })
      .catch(() => {
        this.setState({ error: 'Error HaHaHa', loading: false });
      });
  };

  SignUp = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.EmailVerification(email);
        this.publish(
          this.params.Fname,
          this.params.Lname,
          this.params.Gender,
          this.state.TextInputEmail,
          this.state.TextInputPass,
          this.state.TextInputNumber
        );
        this.setState({ error: '', loading: false });
        this.nav('Login', {});
      })
      .catch(() => {
        this.setState({ error: 'Authentication failed.', loading: false });
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        behavior="padding"
        enabled>
        <ScrollView>
          <Image
            source={require('Images/coursi.png')}
            style={{
              marginTop: 60,
              marginBottom: 5,
              width: 280,
              height: 80,
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              marginTop: 70,
              fontSize: 18,
              marginLeft: 25,
            }}>
            Email
          </Text>
          <TextInput
            placeholder="  Enter Your Email"
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputEmail: text })}
          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
            }}>
            Password
          </Text>

          <TextInput
            placeholder="  Enter Your Password"
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            secureTextEntry={true}
            onChangeText={text => this.setState({ TextInputPass: text })}
          />
          <Text
            style={{
              fontSize: 18,
              marginLeft: 20,
            }}>
            Phone Number
          </Text>

          <TextInput
            placeholder="  Enter Your Number"
            keyboardType="numeric"
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputNumber: text })}
          />
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                marginBottom: 15,
                marginTop: 8,
                backgroundColor: '#4F92A7',
                borderWidth: 2,
                borderColor: '#4F92A7',
                paddingTop: 5,
                paddingBottom: 10,
                borderRadius: 20,
                marginRight: 20,
                marginLeft: 20,
              }}
              onPress={() =>
                this.SignUp(this.state.TextInputEmail, this.state.TextInputPass)
              }>
              <Text
                style={{
                  color: 'white',
                }}>
                {' '}
                Next
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.GoToSignup1}
              style={{
                backgroundColor: '#ecf0f1',
                borderRadius: 15,
                borderColor: '#4F92A7',
                borderWidth: 2,
                marginRight: 270,
                marginTop: 5,
              }}>
              <Text
                style={{
                  color: '#4F92A7',
                  padding: 10,
                }}>
                {' '}
                Previous{' '}
              </Text>
            </TouchableOpacity>
            <Text style={styles.errorTextStyle}>{this.state.error}</Text>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
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

  // paragraph: {
  //   margin: 24,
  //   fontSize: 40,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },

  Textinput: {
    height: 40,
    margin: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
  errorTextStyle: {
    color: '#E64A19',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },

  // Textinput2: {
  //   // alignItems: 'center',
  //   marginBottom: 5,
  // },

  // button: {
  //   marginRight: 50,
  //   marginLeft: 50,
  // },
});
