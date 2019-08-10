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
  MultipleChoice,
  ScrollView
} from 'react-native';

import Constants from 'expo-constants';
import firebase from 'firebase';

export default class SignUp1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputFirstName: '',
      TextInputLastName: '',
      TextInputUsername: '',
      TextInputGender: 'Male or Female',
    };
  }

  nav = this.props.navigation.navigate;

  textcheck = () => {
    if (this.state.TextInputName != '') {
      if (this.state.TextInputLastName != '') {
        this.nav('Signup3', {
          Fname: this.state.TextInputFirstName,
          Lname: this.state.TextInputLastName,
          Uname: this.state.TextInputUsername,
          Gender:this.state.TextInputGender
        });
      } else {
        alert('Please Enter Your First Name');
      }
    } else {
      alert('Please Enter Your Last Name');
    }
  };

  GoToLogin = () => {
    this.nav('Login', {});
  };

  render() {
    return (
     <ScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}>
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

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 75,
            marginLeft: 20,
            marginTop: 100,
          }}>
          <Text
            style={{
              marginTop: 20,
              fontSize: 18,
            }}>
            First Name
          </Text>
          <Text
            style={{
              marginTop: 20,

              fontSize: 18,
            }}>
            Last Name
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginRight: 15,
            marginLeft: 15,
          }}>
          <TextInput
            placeholder=" "
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputFirstName: text })}
          />

          <TextInput
            placeholder=""
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputLastName: text })}
          />
        </View>

        <View
          style={{
            marginTop: 20,
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              marginBottom: 50,
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
            onPress={this.textcheck}>
            <Text
              style={{
                color: 'white',
              }}>
              {' '}
              Next
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.GoToLogin}
            style={{
              backgroundColor: '#ecf0f1',
              borderRadius: 15,
              borderColor: '#4F92A7',
              borderWidth: 2,
              marginRight: 270,
              marginTop: 90,
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
        </View>
      </ScrollView>
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
    width: 150,
    height: 40,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 17,
    marginBottom: 0,
  },

  // button: {
  //   marginRight: 50,
  //   marginLeft: 50,
  // },
});
