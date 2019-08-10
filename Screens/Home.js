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
  Platform,
} from 'react-native';

import Constants from 'expo-constants';
import firebase from 'firebase';
import { Header } from 'react-native-elements';

import '@expo/vector-icons';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      username: '',
      error: '',
      loading: false,
    };
  }

  nav = this.props.navigation.navigate;

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  GotToTutors = () => {
    this.nav('Tutors', {});
  };

  GotToInstitutions = () => {
    // console.log(this.params.username);
    this.nav('Institutions', {
      navigation: this.props.navigation,
    });
  };
  render() {
    return (
      <View style={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
        <Header
          containerStyle={{ height: Platform.OS === 'ios' ? 70 : 90 - 24 }}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.toggleDrawer(),
          }}
          centerComponent={{ text: 'Home', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="#4F92A7"
        />
        <ScrollView>
          <View
            style={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}>
            <View
              style={{
                paddingRight: 80,
                paddingLeft: 80,
              }}>
              <TouchableOpacity
                style={styles.Textinput2}
                onPress={this.GotToInstitutions}>
                <Image
                  style={{
                    width: 200,
                    height: 130,
                    alignSelf: 'center',
                    marginTop: 40,
                    borderRadius: 4,
                    borderWidth: 0,
                  }}
                  source={require('Images/Class.png')}
                />

                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'monospace',
                    textAlign: 'center',
                    marginTop: 30,
                    marginBottom: 30,
                  }}>
                  {' '}
                  Institutions{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.Textinput3}
                onPress={this.GotToTutors}>
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    marginTop: 40,
                    borderRadius: 4,
                    marginRight: 20,
                    alignSelf: 'center',
                  }}
                  source={require('Images/Teacher.png')}
                />

                <Text
                  style={{
                    color: 'black',
                    fontSize: 20,
                    fontFamily: 'PlayfairDisplay',
                    textAlign: 'center',
                    marginTop: 30,
                    marginBottom: 30,

                    marginRight: 20,
                  }}>
                  {' '}
                  Tutors{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
  },
  Textinput2: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 0,
  },

  Textinput3: {
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 200,
    borderWidth: 0,
  },
});
