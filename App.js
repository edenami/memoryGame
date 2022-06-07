/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView,StyleSheet,Text} from 'react-native';
import SignInScreen from 'Autho/src/screens/SignInScreen/SignInScreen.js';
import SignUpScreen from 'Autho/src/screens/SignUpScreen'; 
import ConfirmEmailScreen from 'Autho/src/screens/ConfirmEmailScreen/ConfirmEmailScreen.js';
import ForgotPasswordScreen from 'Autho/src/screens/ForgotPasswordScreen/ForgotPasswordScreen.js';
import NewPasswordScreen from './src/screens/NewPasswordScreen/NewPasswordScreen.js';
import Navigation from './src/navigation';
import HomeScreen from 'Autho/src/screens/HomeScreen/HomeScreen.js'

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root:{
    flex:1,
    backgroundColor: '#F9FBFC'
  },
});

export default App;
