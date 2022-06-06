import React from "react";
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import SignInScreen from '../screens/SignInScreen/SignInScreen.js';
import SignUpScreen from '../screens/SignUpScreen'; 
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen/ConfirmEmailScreen.js';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen.js';
import NewPasswordScreen from '../screens/NewPasswordScreen/NewPasswordScreen.js';
import HomeScreen from "../screens/HomeScreen/HomeScreen.js";
import WaitingForPlayers from "../screens/WaitingForPlayers/WaitingForPlayers.js";
import Game from "../screens/Game/Game.js"
import Islands from "../screens/Islands/Islands.js"

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                <Stack.Screen name="islands" component={Islands}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="WaitingForPlayers" component={WaitingForPlayers}/>
                <Stack.Screen name="Game" component={Game}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation