import React, {useState, Component} from "react";
import {View, Text, StyleSheet, ScrollView, webView} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import Terms from "../../components/Terms/Terms";
import SocialSignInButtons from "../../components/SocialSignInButton/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";

const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, SetNewPassword] = useState('');

    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate('Home');
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Reset your password</Text>

            <CustomInput
            placeholder="Code"
            value={code}
            setValue={setCode}
            secureTextEntry={false}/>

            <CustomInput
            placeholder="Enter your new password"
            value={newPassword}
            setValue={SetNewPassword}
            secureTextEntry={true}/>

            <CustomButton
            onPress={onSubmitPressed}
            text='Submit'
            />

            <CustomButton 
                text="Back to sign in"
                onPress={onSignInPressed}
                type="TERTIARY"
            />

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },

    text: {
        color: 'grey',
        marginVertical: 10,
    },

    link: {
        color: '#FDB075'
    },
});

export default NewPasswordScreen