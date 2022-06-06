import React from "react";
import { View, Text } from "react-native";
import CustomButton from "../CustomButton";

const SocialSignInButtons = () =>
{

    const onSignInFacebook = () => {
        console.warn("facebook");
    };
    const onSignInGoogle = () => {
        console.warn("google");
    };
    const onSignInApple = () => {
        console.warn("apple");
    };

    return (
        <>
            <CustomButton
            onPress={onSignInFacebook}
            text='Sign In with Facebook'
            bgColor="#E7EAF4"
            fgColor="blue"
            />

            <CustomButton
            onPress={onSignInGoogle}
            text='Sign In with Google'
            bgColor="#FAE9EA"
            fgColor="#DD4D44"
            />

<CustomButton
            onPress={onSignInApple}
            text='Sign In with Apple'
            bgColor="#e3e3e3"
            fgColor="#363636"
            />

        </>
    )
}

export default SocialSignInButtons