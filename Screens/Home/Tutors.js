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

class Tutors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: null,
      username: '',
      flatlistList: [],
      uri: '',
    };
  }

  nav = this.props.navigation.navigate;

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  handlepress4 = () => {
    this.nav('CreateT', {});
  };

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
    firebase
      .database()
      .ref('Profiles')
      .on('value', snapshot => {
        const Profiles = snapshot.val();
        var usr = this.state.username;
        for (var key in Profiles) {
          var owner1 = Profiles[key].Email;
          if (usr == owner1) {
            this.setState({ owner: Profiles[key].Owner });
          }
        }
      });
    firebase
      .database()
      .ref('Tutors')
      .on('value', snapshot => {
        const list1 = snapshot.val();
        var newList = [];
        for (var key in list1) {
          const Name = list1[key].Name;

          const Grade = list1[key].Classes;
          const Subject = list1[key].Subject;

          const Price = list1[key].Price;

          const Phone = list1[key].PhoneNumber;
          const Uri = list1[key].Uri;

          const Key = key;

          var newObj = {
            //Flatlist
            name: Name,
            grade: Grade,
            //details
            subject: Subject,
            price: Price,
            number: Phone,
            key: Key,
            uri: Uri,
          };
          newList.unshift(newObj);
        }
        this.setState({ flatlistList: newList });
      });
  };

  publish = (username, Ka) => {
    firebase
      .database()
      .ref('Profiles')
      .on('value', snapshot => {
        const Profiles = snapshot.val();
        for (var key in Profiles) {
          console.log('Key  ' + key);
          if (Profiles[key].Email == username) {
            console.log('Email' + username);
            console.log('Name 1' + Ka);
            if (Profiles[key].Tutors.includes(Ka) == false) {
              console.log('Name 2' + Ka);
              var arr = Profiles[key].Tutors;
              arr.push(Ka);
              const posts = firebase.database().ref('Profiles/' + key);
              posts.update({
                Tutors: arr,
              });
            }
          }
        }
      });
  };

  handlepress = (username, Ka) => {
    Alert.alert(
      'Favorite',
      'Do you Want to add this teacher to your Favorite Tutors',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.publish(username, Ka) },
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          containerStyle={{
            height: Platform.OS === 'ios' ? 70 : 90 - 24,
          }}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.toggleDrawer(),
          }}
          centerComponent={{ text: 'Tutors', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="#4F92A7"
        />
        <FlatList
          data={this.state.flatlistList}
          renderItem={({ item }) => {
            return (
              <View style={{ marginTop: 15, padding: 8 }}>
                <TouchableOpacity
                  onPress={() =>
                    this.handlepress(this.state.username, item.name)
                  }
                  style={styles.Border}>
                  <View
                    style={{
                      marginTop: 17,
                      marginBottom: 17,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{ uri: item.uri }}
                      style={{
                        width: 150,
                        height: 150,
                        marginLeft: 8,
                        alignSelf: 'center',
                      }}
                    />
                    <View>
                      <Text style={styles.text}>{item.name}</Text>
                      <Text style={styles.text}>Phone: {item.number}</Text>
                      <Text style={styles.text}>Subject: {item.subject}</Text>
                      <Text style={styles.text}>Classes: {item.grade}</Text>
                      <Text style={styles.text}>Price: {item.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {this.state.owner == true && (
          <View
            style={{
              flexDirection: 'row',
              alignContent: 'flex-end',
            }}>
            <TouchableOpacity style={styles.create} onPress={this.handlepress4}>
              <Text> Create Tutors</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
export default Tutors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },

  Border: {
    borderColor: '#1c2938',
    borderWidth: 1.5,

    borderRadius: 7,
  },

  text: {
    marginTop: 2,
    fontSize: 20,
    marginLeft: 10,
  },
  create: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#ffb961',
    marginBottom: 0,
  },
});
