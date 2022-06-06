import React, {useState, Component} from "react";
import {View, Text, StyleSheet, ScrollView, webView} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import Terms from "../../components/Terms/Terms";
import SocialSignInButtons from "../../components/SocialSignInButton/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import CustomInput2 from "../../components/CustomInput2/CustomInput2";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import { Crypt, RSA } from 'hybrid-crypto-js';

const SignUpScreen = () => {
    var crypt = new Crypt();
    var rsa = new RSA();
    const [message, setMessage] = useState('');
    const {control,
        handleSubmit,
        formState:{errors},
      } = useForm();

    const navigation = useNavigation();

    const onRegisterPressed = async data => {
        //בדיקת תקינות הסיסמה, הצפנתה ושליחת הנתונים מהטופס לשרת
        if(!isupper(data.password)||!islower(data.password)||!data.password.length>=8)
            setMessage("password must be at least 8 charcters and contain uppercase char")
        else if(!validateEmail(data.email))
            setMessage("password must be at least 8 charcters and contain uppercase char")
        else if(data.password == data.passwordRepeat)
        {
            let result2 = await axios.get('http://10.100.102.12:3000/key');
            var publicKey = result2.data
            console.log("pub: "+publicKey)
            var encryptedPass = crypt.encrypt(publicKey, data.password);
            let result = await axios.post('http://10.100.102.12:3000/signUp',{
                username: data.username,
                password: encryptedPass,
                email: data.email
            });
            if(result.data != "created")
            {
                setMessage("username or email already exist")
            }
            else
            {
                setMessage('')
                navigation.navigate("ConfirmEmail")
            }
        }
        else{
            setMessage("password repeat is not correct!")
        }
    };

    function isupper(str) {
        for (var i = 0; i < str.length; i++) {
            if(/[A-Z]/.test(str.charAt(i)))
            return true;
        }
        return false;
    }
    function islower(str)
    {
        for (var i = 0; i < str.length; i++) {
            if(/[a-z]/.test(str.charAt(i)))
            return true;
        }
        return false;
    }
    function validateEmail(email) {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    const onTermsOfUsePress = () => {
        console.warn("d");
    };

    const onSignInPressed = () => {
        navigation.navigate("SignIn");
    };


    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Create an account</Text>

            <CustomInput
            name="username"
            placeholder="Username"
            control={control}
            secureTextEntry={false}
            rules={{required: {
                value: true,
                message: 'Field is required!'
              }}}
            />

            <CustomInput
            name="email"
            placeholder="Email"
            control={control}
            secureTextEntry={false}
            rules={{required: {
                value: true,
                message: 'Field is required!'
              }}}
            />

            <CustomInput
            name="password"
            placeholder="Password"
            control={control}
            secureTextEntry={true}
            rules={{required: {
                value: true,
                message: 'Field is required!'
              }}}/>

            <CustomInput
            name="passwordRepeat"
            placeholder="Repeat Password"
            control={control}
            secureTextEntry={true}
            rules={{required: {
                value: true,
                message: 'Field is required!'
              }}}/>

            <Text>
                {message}
            </Text>

            <CustomButton
            onPress={handleSubmit(onRegisterPressed)}
            text='Register'
            />

            <Text style={styles.text}>
                By registering, you confirm that you accept our {' '}
                <Text style={styles.link} onPress={onTermsOfUsePress}>Terms and Conditions</Text>
            </Text>
            
            <SocialSignInButtons />

            <Text>Have an account? {' '}
            <Text style={styles.link} onPress={onSignInPressed}>Sign in</Text>
            </Text>

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

export default SignUpScreen