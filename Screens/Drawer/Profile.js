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
  Platform,
} from 'react-native';

import Constants from 'expo-constants';
import firebase from 'firebase';
import { Header } from 'react-native-elements';

import '@expo/vector-icons';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{ height: Platform.OS === 'ios' ? 70 : 90 - 24 }}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.toggleDrawer(),
          }}
          centerComponent={{ text: 'Profile', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="#4F92A7"
        />
        <Image
          source={{
            uri:
              'https://www.simple-life.com/wp-content/uploads/Coming-Soon-Long-1-1005x1024.png',
          }}
          style={{ width: '100%', height: '60%' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    flexDirection: 'column',
    paddingLRight: 10,
  },
  // container1: {
  //   flexDirection: 'row',
  //   padding: 7,
  //   paddingTop:5,
  // },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#4F92A7',
    width: 300,

    height: 30,
    // marginLeft:50,

    // justifyContent:'center',
  },

  image: {
    width: 100,
    height: 100,
    marginLeft: 125,
    // marginBottom: 10,

    // borderRadius: 70,
  },
  title: {
    marginRight: 20,
    fontSize: 22,
  },
  button: {
    // padding: 50,
    flex: 1,
    marginTop: 150,
  },
  text: {
    color: 'white',
  },
});
