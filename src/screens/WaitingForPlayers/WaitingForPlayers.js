import React, {useState, Component} from "react";
import {View, Text, StyleSheet, ScrollView, webView} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import Terms from "../../components/Terms/Terms";
import SocialSignInButtons from "../../components/SocialSignInButton/SocialSignInButtons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

const WaitingForPlayers = () => {
    const { control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [lastTime, setLastTime] = useState((new Date().getTime()))
    const route = useRoute()
    const navigation = useNavigation();
    console.log(lastTime)
    const[inte, setInte] = useState(false)

    const checkPlayer2 = async ()=>{
        if((new Date().getTime()) - lastTime >= 10000){
            console.log("checking")
            setLastTime((new Date().getTime()))
             let result=await axios.get(`http://10.100.102.12:3000/getGame/${route.params.gameId}`);
             console.log("playerr2", result.data, route.params.gameId, result)
             if((typeof result.data.player2 != 'undefined'))
                 navigation.navigate("Game", {player:route.params.player, gameId:route.params.gameId})
                 return
                }
     }

      if(!inte){
          setInte(true)
 setInterval(checkPlayer2, 2000)}
     
    return(
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>Waiting For Players...</Text>
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

export default WaitingForPlayers