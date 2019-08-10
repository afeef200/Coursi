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
  Image
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import Constants from 'expo-constants';
import firebase from 'firebase';

export default class CreateT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputClass: '10th grade',
      TextInputPrice: 0,
      TextInputSubject: 'Math',
      TextInputPhone: '',
      TextInputUri: '',
    };
  }
  nav = this.props.navigation.navigate;

  publish = (name, phoneN, subject, price, classes, uri) => {
    const posts = firebase.database().ref('Tutors');
    posts.push({
      Name: name,
      PhoneNumber: phoneN,
      Subject: subject,
      Price: price,
      Classes: classes,
      Uri: uri,
    });
  };

  GoToTutors = () => {
    // if (
    //   this.state.TextInputSubject &&
    //   this.state.TextInputPrice &&
    //   this.state.TextInputTeacher &&
    //   this.state.TextInputTime  != null
    // ) {
    this.publish(
      this.state.TextInputName,
      this.state.TextInputPhone,
      this.state.TextInputSubject,
      this.state.TextInputPrice,
      this.state.TextInputClass,
      this.state.TextInputUri
    );
    this.nav('Tutors', {});
  };

  render() {
    return (
      <ScrollView>
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
        <View style={styles.container1}>
          <Text style={styles.title}>Name:</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputName: text })}
          />
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Phone Number:</Text>
          <TextInput
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputPhone: text })}
          />
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Subject:</Text>

          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.TextInputSubject}
            onValueChange={itemValue =>
              this.setState({ TextInputSubject: itemValue })
            }>
            <Picker.Item label="              Math" value="Math" />
            <Picker.Item label="           English" value="English" />
            <Picker.Item label="         Chemistry" value="Chemistry" />
            <Picker.Item label="           Physics" value="Physics" />
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
          <Text style={styles.title}>Class:</Text>
          <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={this.state.TextInputClass}
            onValueChange={itemValue =>
              this.setState({ TextInputClass: itemValue })
            }>
            <Picker.Item label="         10th Grade" value="10th Grade" />
            <Picker.Item label="         11th Grade" value="11th Grade" />
            <Picker.Item label="         12th Grade" value="12th Grade" />
          </Picker>
        </View>

        <View style={styles.container1}>
          <Text style={styles.title}>Uri:</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.Textinput}
            onChangeText={text => this.setState({ TextInputUri: text })}
          />
        </View>

        <TouchableOpacity style={styles.Textinput2} onPress={this.GoToTutors}>
          <Text
            style={{
              fontFamily: 'Cochin',
              fontWeight: 'bold',
              paddingTop: 10,
            }}>
            {' '}
            Submit{' '}
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
    backgroundColor: '#95adbe',
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 30,
    borderRadius: 100,
  },

  Textinput2: {
    alignItems: 'center',
    marginLeft: 130,
    backgroundColor: '#95adbe',
    borderRadius: 20,
    width: 150,
    height: 50,
    paddingTop: 5,
  },
});
