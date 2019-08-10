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
  Picker,
  ScrollView,
  Image,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import Constants from 'expo-constants';
import firebase from 'firebase';

import DateTimePicker from 'react-native-modal-datetime-picker';

export default class create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputClass: '10th grade',
      TextInputPrice: 0,
      TextInputTeacher: '',
      TextInputTime: '',
      TextInputSubject: 'Math',
      TextInputPlace: '',
      date1: '',
      number: '0597555999',
      username: 'Science and Culture',
      location: 'Nablus',
      MaxStudent: null,
      Active: true,
      Students: [''],
      NumberS: 0,
    };
  }
  nav = this.props.navigation.navigate;

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    this.setState({ date1: date });
    this.hideDateTimePicker();
  };

  showDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: true });
  };

  hideDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: false });
  };

  handleDatePicked2 = date => {
    this.setState({ TextInputTime: date });
    this.hideDateTimePicker2();
  };

  publish = (
    class1,
    subject,
    price,
    teacher,
    time,
    date,
    number,
    username,
    location,
    max
  ) => {
    const posts = firebase.database().ref('Rooms');
    posts.push({
      Price: price,
      Teacher: teacher,
      Date: date,
      Time: time,
      Phone_Number: number,
      Location: location,
      MaxStudent: max,
      Name: username,
      Class: class1,
      Subject: subject,
      Active: this.state.Active,
      Students: this.state.Students,
      NumberOfStudent: this.state.NumberS,
    });
  };

  GoToInstitutions = () => {
    if (
      this.state.TextInputSubject &&
      this.state.TextInputPrice &&
      this.state.TextInputTeacher &&
      this.state.TextInputTime &&
      this.state.date1 &&
      this.state.MaxStudent != null
    ) {
      this.publish(
        this.state.TextInputClass,
        this.state.TextInputSubject,
        this.state.TextInputPrice,
        this.state.TextInputTeacher,
        this.state.TextInputTime,
        this.state.date1,
        this.state.number,
        this.state.username,
        this.state.location,
        this.state.MaxStudent
      );
      this.nav('Institutions', {});
    }
  };

  render() {
    return (
      <View style={styles.container} resetScrollToCoords={{ x: 0, y: 0 }}>
        <Image
          source={require('Images/coursi.png')}
          style={{
            marginTop: 120,
            marginBottom: 80,
            width: 280,
            height: 80,
            alignSelf: 'center',
          }}
        />
        <ScrollView>
          <View style={styles.container1}>
            <Text style={styles.title}>Class:</Text>
            <Picker
              style={styles.Textinput2}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.TextInputClass}
              onValueChange={itemValue =>
                this.setState({ TextInputClass: itemValue })
              }>
              <Picker.Item
                style={{ color: '#fff' }}
                label="         10th Grade"
                value="10th Grade"
              />
              <Picker.Item
                style={{ color: '#fff' }}
                label="         11th Grade"
                value="11th Grade"
              />
              <Picker.Item
                style={{ color: '#fff' }}
                label="         12th Grade"
                value="12th Grade"
              />
            </Picker>
          </View>

          <View style={styles.container1}>
            <Text style={styles.title}>Subject:</Text>

            <Picker
              style={styles.Textinput2}
              itemStyle={styles.pickerItem}
              selectedValue={this.state.TextInputSubject}
              onValueChange={itemValue =>
                this.setState({ TextInputSubject: itemValue })
              }>
              <Picker.Item
                style={{ color: '#fff' }}
                label="              Math"
                value="Math"
              />
              <Picker.Item
                style={{ color: '#fff' }}
                label="           English"
                value="English"
              />
              <Picker.Item
                style={{ color: '#fff' }}
                label="         Chemistry"
                value="Chemistry"
              />
              <Picker.Item
                style={{ color: '#fff' }}
                label="           Physics"
                value="Physics"
              />
            </Picker>
          </View>
          <View style={styles.container1}>
            <Text style={styles.title}>price</Text>
            <TextInput
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              style={styles.Textinput}
              onChangeText={text => this.setState({ TextInputPrice: text })}
            />
          </View>

          <View style={styles.container1}>
            <Text style={styles.title}>teacher</Text>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.Textinput}
              onChangeText={text => this.setState({ TextInputTeacher: text })}
            />
          </View>

          <View style={styles.container1}>
            <Text style={styles.title}>Max Num</Text>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.Textinput}
              keyboardType="numeric"
              onChangeText={text => this.setState({ MaxStudent: text })}
            />
          </View>

          <View style={styles.container1}>
            <TouchableOpacity
              style={styles.Textinput2}
              onPress={this.showDateTimePicker2}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  padding: 0,
                  paddingTop: 10,
                }}>
                Choose Time
              </Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible2}
              onConfirm={this.handleDatePicked2}
              onCancel={this.hideDateTimePicker2}
              mode={'time'}
              is24Hour={true}
            />
          </View>

          <View style={styles.container1}>
            <TouchableOpacity
              style={styles.Textinput2}
              onPress={this.showDateTimePicker}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,
                  padding: 0,
                  paddingTop: 10,
                }}>
                Choose Date
              </Text>
            </TouchableOpacity>

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
              mode={'date'}
            />
          </View>

          <TouchableOpacity
            style={styles.Textinput2}
            onPress={this.GoToInstitutions}>
            <Text
              style={{
                fontFamily: 'Cochin',
                fontWeight: 'bold',
                paddingTop: 10,
                color: 'white',
                fontSize: 16,
                padding: 0,
              }}>
              {' '}
              Submit{' '}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  container1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  // paragraph: {
  //   margin: 24,
  //   fontSize: 40,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },

  Textinput: {
    height: 40,
    marginRight: 20,
    borderColor: 'gray',
    borderWidth: 0.3,
    borderRadius: 20,
    width: 200,
    textAlign: 'left',
    paddingLeft: 50,
    paddingBottom: 5,
    alignItems: 'stretch',
    alignSelf: 'flex-end',
  },

  title: {
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
    marginRight: 30,
    textAlign: 'left',
  },
  picker: {
    width: 200,
    height: 50,
    backgroundColor: '#4F92A7',
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 30,
    borderRadius: 100,
  },

  Textinput2: {
    alignItems: 'center',
    marginLeft: 100,
    backgroundColor: '#4F92A7',
    borderRadius: 20,
    width: 150,
    height: 50,
    margin: 30,
    padding: 0,
  },
});
