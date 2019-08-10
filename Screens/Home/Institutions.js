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
import {DrawerActions} from 'react-navigation';

import '@expo/vector-icons';

export default class Institutions extends React.Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      username: '',
      Location: '',
      admin: null,
      flatlistList: [],
    };
  }

  nav = this.props.navigation.navigate;
  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
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
        var admin2 = this.state.username;
        for (var key in Profiles){
        var admin1 = Profiles[key].Email;
        if (admin1 == admin2){
        this.setState({ admin: Profiles[key].Admin });}}
      });
    firebase
      .database()
      .ref('Rooms')
      .on('value', snapshot => {
        const list1 = snapshot.val();
        var newList = [];
        for (var key in list1) {
          const Name = list1[key].Name;
          const Location = list1[key].Location;
          const Grade = list1[key].Class;
          const Subject = list1[key].Subject;
          const Date = list1[key].Date;
          const Time = list1[key].Time;
          const Price = list1[key].Price;
          const Teacher = list1[key].Teacher;
          const Phone = list1[key].Phone_Number;
          const MaxStudent = list1[key].MaxStudent;
          const Students = list1[key].Students;
          // console.log("Students");
          // console.log(Students);
          // console.log("Students end");
          const NumS = list1[key].NumberOfStudent;
          const Key = key;

          var newObj = {
            //Flatlist
            name: Name,
            location: Location,
            grade: Grade,
            max: MaxStudent,
            //details
            subject: Subject,
            date: Date,
            time: Time,
            price: Price,
            teacher: Teacher,
            number: Phone,
            students: Students,
            nums: NumS,
            key: Key,
          };
          newList.unshift(newObj);
        }
        this.setState({ flatlistList: newList });
      });
  };

  handlepress4 = () => {
    this.nav('Create', {});
  };

    handlepress3 = () => {
    console.log(this.state.username);
    console.log(this.state.admin);
  };


  handlepress = object => {
    this.nav('InstitutionsD', {
      object: object,
    });
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
          centerComponent={{ text: 'Institutions', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="#4F92A7"
        />
        <FlatList
          data={this.state.flatlistList}
          renderItem={({ item }) => {
            return (
              <View style={{ marginTop: 15 , padding:8,}}>
                <TouchableOpacity
                  onPress={() =>this.handlepress(item)}
                  style={styles.Border}>
                  <View
                    style={{
                      marginTop: 17,
                      marginBottom: 17,
                      flexDirection: 'row',
                    }}>
                    {item.subject == 'Math' && (
                      <Image
                        source={require('Images/Math.png')}
                        style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          marginLeft:20
                        }}
                      />
                    )}

                    {item.subject == 'English' && (
                      <Image
                        source={require('Images/English.png')}
                        style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          marginLeft:20,
                          marginTop:15, 
                        }}
                      />
                    )}

                    {item.subject == 'Chemistry' && (
                      <Image
                        source={require('Images/Chemistry.png')}
                        style={{
                          width: 100,
                          height: 100,
                          alignSelf: 'center',
                          marginLeft:20

                        }}
                      />
                    )}
                    {item.subject == 'Physics' && (
                      <Image
                        source={require('Images/Physics.png')}
                        style={{
                          width: 100,
                          height: 100,
                          marginLeft:20,
                          alignSelf: 'center',
                        }}
                      />
                    )}
                    <View>
                      <Text style={styles.text}>{item.grade}</Text>
                      <Text style={styles.text}>{item.location}</Text>
                      <Text style={styles.text}>
                        {item.nums}/{item.max}
                      </Text>
                      <Text style={styles.text}>{item.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
        {this.state.admin == true && (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TouchableOpacity style={styles.create} onPress={this.handlepress4}>
              <Text> Create Room</Text>
            </TouchableOpacity>
          </View>
        )}
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
  },

  Border: {
    borderColor: '#1c2938',
    borderWidth: 1.5,

    borderRadius: 7,  
  },

  text: {
    marginTop: 2,
    fontSize: 20,
    marginLeft: 40,
  },
  create: {
    borderRadius: 5,
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#ffb961',
    marginBottom: 0,
  },
 
});
