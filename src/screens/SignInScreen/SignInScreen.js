import React, { useState } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import Svg, { Path } from "react-native-svg";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import {NetworkInfo} from 'react-native-network-info';
import publicIP from 'react-native-public-ip';
import SVGImg from 'Autho/assets/Cat.svg';

const SignInScreen = () => {
    const [message, setMessage] = useState('');
    const { control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    //NetworkInfo.getIPV4Address().then(ipv4Address => {  console.log(ipv4Address); });

    const onSignInPressed = async data =>  {
        if (data.username && data.password) {
            let result = await axios.post('http://10.100.102.12:3000/login', {
                username: data.username,
                password: data.password
            });
            
            if(result.data == 'ok'){
               navigation.navigate('islands')
            }
            else{
                 setMessage('Invalid Credentials')
            }
        }
        else {
            setMessage('Username and Password are required')
        }
        //     axios
        //   .post('http://10.100.102.7:3000/login', {
        //    username: data.username,
        //     password: data.password
        //   })
        //   .then(function (response) {
        //     // handle success
        //     alert(JSON.stringify(response.data));
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     alert(error.message);
        //   });
        // fetch('/login', {
        //     method: 'POST',
        //     headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //     username:data.username,
        //     password: data.password,
        //     }),
        //     })
        //     .then((response) => response.json())
        //     .then((responseJson) => {
        //     console.log(resp);
        //     });
    };

    const onForgetPasswordPressed = () => {
        console.warn("onForgetPasswordPressed");

        navigation.navigate("ForgotPassword");
    };

    const onSignInFacebook = () => {
        console.warn("facebook");
    };
    const onSignInGoogle = () => {
        console.warn("google");
    };
    const onSignInApple = () => {
        console.warn("apple");
    };

    const onSignUpPressed = () => {
        console.warn("on sign up pressed");
        navigation.navigate("SignUp");
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <CustomInput
                    name="username"
                    placeholder="Username"
                    control={control}
                    secureTextEntry={false} />

                <CustomInput
                    name="password"
                    placeholder="Password"
                    control={control}
                    secureTextEntry={true}
                />
                <Text style={styles.text}>
                {message}
                </Text>
                <CustomButton onPress={handleSubmit(onSignInPressed)} text='Sign In' />
                
                <CustomButton
                    onPress={onForgetPasswordPressed}
                    text='Forget Password?'
                    type="TERTIARY" />

                <SocialSignInButton />

                <CustomButton
                    onPress={onSignUpPressed}
                    text="Don't have an account? Create one"
                    type="TERTIARY" />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    text:
    {
        color: 'red'
    },
    img: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
});

export default SignInScreen