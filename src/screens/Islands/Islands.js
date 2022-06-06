import React, {useState, Component} from "react";
import {View, Text, StyleSheet, ScrollView, webView, Image, TouchableOpacity, ImageBackground} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";


const Islands = () => {
    const navigation = useNavigation();
    const back = require("Autho/assets/Vector.png")

    return(
        <ScrollView>
      
           <View >
       <ImageBackground source={require("Autho/assets/back.png")} style={{ flex: 1,resizeMode: 'cover'}}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Home")}}>
          <Image source={require("Autho/assets/calm.png")}/>
        </TouchableOpacity>
        <Image style={{top: 10,bottom: 0,left: 70,right: 0,}} source={require("Autho/assets/vector2.png")}/>
         <Image style={{top: 0,bottom: 150,left: 250,right: 0,}} source={require("Autho/assets/vector2.png")}/>
         <Image style={{top: 0,bottom: 140,left: 90,right: 0,}} source={require("Autho/assets/vector2.png")}/>
         <Image style={{top: 0,bottom: 130,left: 260,right: 30,}} source={require("Autho/assets/vector2.png")}/>
         <Image  style={{top: 50,bottom: 100,left: 200,right: 0,}} source={require("Autho/assets/vector2.png")}/>
        </ImageBackground>
      </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    ImageContainer: {
        marginTop: 50,
        marginBottom: 25,
        width: "100%",
      },
    image: {
        flex: 1,
        justifyContent: "center"
      },
    button:
    { 
        left: 200,      
},
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

export default Islands