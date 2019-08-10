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
  FlatList,
  AsyncStorage,
} from 'react-native';

import Constants from 'expo-constants';
import firebase from 'firebase';

export default class InsD extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      num: 0,
      username: '',
    };
  }
  nav = this.props.navigation.navigate;

  _retrieveData = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      } else {
        return null;
      }
    } catch (error) {
      alert(error);
    }
  };

  getUserData = async () => {
    let username = await this._retrieveData('username');
    if (username != null) {
      this.setState({ username: username });
    }
  };

  componentDidMount = async () => {
    await this.getUserData();
    console.log(this.state.username);
  };

  handlepress = () => {
    this.nav('MyClasses', {});
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}>
        {this.params.object.subject == 'Math' && (
          <Image
            source={require('Images/Math.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 15,
              alignSelf: 'center',
            }}
          />
        )}

        {this.params.object.subject == 'English' && (
          <Image
            source={require('Images/English.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 15,
              alignSelf: 'center',
            }}
          />
        )}

        {this.params.object.subject == 'Chemistry' && (
          <Image
            source={require('Images/Chemistry.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 15,
              alignSelf: 'center',
            }}
          />
        )}
        {this.params.object.subject == 'Physics' && (
          <Image
            source={require('Images/Physics.png')}
            style={{
              width: 100,
              height: 100,
              marginBottom: 15,
              alignSelf: 'center',
            }}
          />
        )}

        <Text style={styles.maxnum}>
          {this.params.object.nums}/{this.params.object.max}
        </Text>

        <View style={styles.container1}>
          <Text style={styles.title}>Institution name:</Text>
          <Text style={styles.paragraph}>{this.params.object.name}</Text>
        </View>
        <View style={styles.container1}>
          <Text style={styles.title}>Location:</Text>
          <Text style={styles.paragraph}>{this.params.object.location}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Grade:</Text>
          <Text style={styles.paragraph}>{this.params.object.grade}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Subject:</Text>
          <Text style={styles.paragraph}>{this.params.object.subject}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Time:</Text>
          <Text style={styles.paragraph}>{this.params.object.time}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Date:</Text>
          <Text style={styles.paragraph}>{this.params.object.date}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Price:</Text>
          <Text style={styles.paragraph}>{this.params.object.price}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Teacher:</Text>
          <Text style={styles.paragraph}>{this.params.object.teacher}</Text>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Phone Number:</Text>
          <Text style={styles.paragraph}>{this.params.object.number}</Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            marginBottom: 5,
            marginTop: 40,
            backgroundColor: '#4F92A7',
            borderWidth: 2,
            borderColor: '#4F92A7',
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 20,
            marginRight: 20,
            marginLeft: 20,
          }}
          onPress={this.handlepress}>
          <Text style={{ color: 'white', fontSize: 16, padding: 0 }}>
            Go Back
          </Text>
        </TouchableOpacity>
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
  container1: {
    flexDirection: 'row',
    padding: 10,
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderColor: '#63707E',
    flex: 1,
  },

  maxnum: {
    borderRadius: 25,
    backgroundColor: '#4F92A7',
    // alignItems: 'center',
    padding: 15,
    paddingRight: 30,
    paddingLeft: 30,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'lucida grande',
    alignSelf: 'center',
    color: 'white',
  },
  maxtitle: {
    flex: 1,
    // alignItems: 'center',
    fontFamily: 'lucida grande',
    alignSelf: 'center',
    fontSize: 22,
    padding: 7,
  },

  title: {
    fontSize: 18,
    paddingRight: 20,
  },
});
