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
  AsyncStorage,
} from 'react-native';

import DatePicker from 'react-native-datepicker';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import Header from 'react-native-elements';
import '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import Expo from 'expo';

Facebook.logInWithReadPermissionsAsync('2267718170207307', 'native')

import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator,
} from 'react-navigation';


//login switch
import Login from './Screens/Login';
import Signup1 from './Screens/Signup/Signup1';
import Home from './Screens/Home';

//signup stack
import Signup3 from './Screens/Signup/Signup3';

//Home
import Institutions from './Screens/Home/Institutions';
import Tutors from './Screens/Home/Tutors';

//create class
import Create from './Screens/Create';

//Details
import InstitutionsD from './Screens/Home/InstitutionsD';

//Create tutors
import CreateT from './Screens/CreateT';

//Drawer
import Aboutus from './Screens/Drawer/Aboutus';
import MyClasses from './Screens/Drawer/MyClasses';
import MyTutors from './Screens/Drawer/MyTutors';
import Profile from './Screens/Drawer/Profile';
import Settings from './Screens/Drawer/Settings';

//LogoutScreen
import LogoutScreen from './Screens/Logout';

//InstD
import InsD from './Screens/Home/InsD';

//firebase data
const Config = {
  apiKey: 'AIzaSyBHtdvww69AZtp-ocml9_dTFQsXxQG7iBI',
  authDomain: 'signup-30448.firebaseapp.com',
  databaseURL: 'https://signup-30448.firebaseio.com',
  projectId: 'signup-30448',
  storageBucket: '',
  messagingSenderId: '504675328666',
  appId: '1:504675328666:web:cf90bed02f4b5ab9',
};

if (firebase.apps.length < 1) {
  firebase.initializeApp(Config);
}

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const TutorsSwitch_C = createSwitchNavigator({
  CreateT: CreateT,
  Tutors: Tutors,
});

const TutorsStack_C = createStackNavigator({
  Tutors: {
    screen: Tutors,
    navigationOptions: {
      header: null,
    },
  },
  CreateT: {
    screen: TutorsSwitch_C,
    navigationOptions: {
      header: null,
    },
  },
});

const InsDStack = createStackNavigator({
  MyClasses: {
    screen: MyClasses,
    navigationOptions: {
      header: null,
    },
  },
  InsD: {
    screen: InsD,
    navigationOptions: {
      header: null,
    },
  },
});


const LogoutSwitch = createSwitchNavigator({
  Logout: LogoutScreen,
  Login: Login,
});

const signupstack = createStackNavigator({
  Signup1: {
    screen: Signup1,
    navigationOptions: {
      header: null,
    },
  },
  Signup3: {
    screen: Signup3,
    navigationOptions: {
      header: null,
    },
  },

});

const InstitutionsSwitch_C = createSwitchNavigator({
  Create: Create,
  Institutions: Institutions,
});

const InstitutionsStack_C = createStackNavigator({
  Institutions: {
    screen: Institutions,
    navigationOptions: {
      header: null,
    },
  },
  Create: {
    screen: InstitutionsSwitch_C,
    navigationOptions: {
      header: null,
    },
  },
});

const InstitutionsSwitch_D = createSwitchNavigator({
  InstitutionsD: {
    screen: InstitutionsD,
    navigationOptions: {
      header: null,
    },
  },
  Institutions: {
    screen: Institutions,
    navigationOptions: {
      header: null,
    },
  },
});

const InstitutionsStack_D = createStackNavigator({
  Institutions: {
    screen: Institutions,
    navigationOptions: {
      header: null,
    },
  },
  InstitutionsD: {
    screen: InstitutionsSwitch_D,
    navigationOptions: {
      header: null,
    },
  },

  // Drawer: {
  //   screen: MyDrawerNavigator,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
});

const MyDrawerNavigator = createDrawerNavigator({
  Home: Home,
  Profile: Profile,
  MyClasses: InsDStack,
  Favorites: MyTutors,
  About_Us: Aboutus,
  Settings: Settings,
  Logout: LogoutScreen,
  Institutions: {
    screen: Institutions,
    navigationOptions: {
      drawerLabel: <Hidden />,
    },
  },
  Tutors: {
    screen: Tutors,
    navigationOptions: {
      drawerLabel: <Hidden />,
    },
  },
    TutorsStack_C: {
    screen: TutorsStack_C,
    navigationOptions: {
      drawerLabel: <Hidden />,
    },
  },
    InstitutionsStack_D: {
    screen: InstitutionsStack_D,
    navigationOptions: {
      drawerLabel: <Hidden />,
    },
  },
      InsDStack: {
    screen: InsDStack,
    navigationOptions: {
      drawerLabel: <Hidden />,
    },
  },
});


const Homestack = createStackNavigator({
  Home: {
    screen: MyDrawerNavigator,
    navigationOptions: {
      header: null,
    },
  },
  Institutions: {
    screen: InstitutionsStack_C,
    navigationOptions: {
      header: null,
    },
  },
  Institutions2: {
    screen: InstitutionsSwitch_D,
    navigationOptions: {
      header: null,
    },
  },
  Tutors: {
    screen: TutorsStack_C,
    navigationOptions: {
      header: null,
    },
  },
  // Drawer: {
  //   screen: MyDrawerNavigator,
  //   navigationOptions: {
  //     header: null,
  //   },
  // },
});

const AppSwitch = createSwitchNavigator({
  Login: Login,
  Signup: signupstack,
  Home: Homestack,
  Signup3: Signup3,
});

const App = createAppContainer(AppSwitch);

export default App;
