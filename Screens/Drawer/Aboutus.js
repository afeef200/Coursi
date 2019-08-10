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

export default class AboutUs extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <Header
          containerStyle={{ height: Platform.OS === 'ios' ? 70 : 90 - 24 }}
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.toggleDrawer(),
          }}
          centerComponent={{ text: 'About Us', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          backgroundColor="#4F92A7"
        />
        
   <Image  style={{ width:280, height:80,marginLeft:40}}
         source={require('Images/coursi.png')}/>

       <Text style ={{fontfamily:'Arial', fontSize:20,}}> </Text>
<Text style={styles.title1}> Who Are We?</Text>
<Text style={styles.line1}> ____________________________________________________</Text>
  <Text style={{fontSize:20,fontfamily:'Arial'}}> our app is focusing on a huge problem that we "students" face which is the lack of planning in the local educational training centers ,when we go to take a class we find the room filled with students or completely empty and that isn't good for both centers and the students,so we planned to make this app that solves the problem by creating some kind of events so that the student ,the teacher and the center can estimate the number of students that are coming and book your place ,and there is a section for tutors and contacting them and giving them reviews so the students can choose correctly and select the best tutor for them. </Text>


  <Text style={styles.contact}> Contact Us </Text>
  <Text style={styles.line2}>____________________________________________________</Text>
      
      <Image style={styles.facebook}  source={require('Images/face.png')}/>
            <Image style={styles.insta}  source={require('Images/insta.png')}/>

                  <Image style={styles.slack}  source={require('Images/slack.png')}/>
      </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  title1:{
    fontweight:'bold',
    fontSize:30,
    marginTop:30,
    marginRight:10,
    color:'#f3a953',
  },
 
  contact:{
    fontweight:'bold',
    fontSize:30,
    marginTop:30,
    marginRight:10,
    color:'#f3a953',
  },
   


 facebook:{
   marginTop:30,
   width:50, 
   height:50,
 },
 insta:{
  width:50, 
   height:50,
   marginLeft:100,
   marginBottom:60,
 },
 slack:{
  width:50, 
   height:50,
   marginLeft:200,
 },


});
