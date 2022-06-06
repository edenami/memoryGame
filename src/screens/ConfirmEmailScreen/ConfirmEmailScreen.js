import React, {useState, Component} from "react";
import {View, Text, StyleSheet, ScrollView, webView} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import Terms from "../../components/Terms/Terms";
import SocialSignInButtons from "../../components/SocialSignInButton/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const { control,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigation = useNavigation();

    const onConfirmPressed = data => {
        if(data.confirmationCode == '1234')
        {
        navigation.navigate('Home');
        }
        else{
            setMessage("wrong code")
        }
    };

    const onResendPressed = () => {
        console.warn("d");
    };

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    };

    const onSignUpPressed = () => {
        console.warn("on sign up pressed");
    };

    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your Email</Text>

            <CustomInput
            name="confirmationCode"
            placeholder="Enter your confirmation code"
            control={control}
            secureTextEntry={false}
            />


            <CustomButton
            onPress={handleSubmit(onConfirmPressed)}
            text='Confirm'
            />

            <Text>{message}</Text>

            <CustomButton 
                text="Resend Code"
                onPress={onResendPressed}
                type="SECONDARY"
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

export default ConfirmEmailScreen