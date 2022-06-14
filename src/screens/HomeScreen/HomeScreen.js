import React, {useState, Component} from "react";
import {View, Text, StyleSheet, ScrollView, webView, AsyncStorage, Image} from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton"; 
import Terms from "../../components/Terms/Terms";
import SocialSignInButtons from "../../components/SocialSignInButton/SocialSignInButtons";
import { NavigationContainer, useNavigation, useRoute} from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";


const HomeScreen = () => {
    const { control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [arr, setArr] = useState([]);
    

   const navigation = useNavigation();
   const route = useRoute()
    const player = route.params.player

    const onCreatePressed = async data => {
        //בעת לחיצה על כפתור יצירת משחק הוספת משחק לבסיס הנתונים על ידי שליחת בקשת פוסט לשרת ומעבר למסך שמחכה לשחקן נוסף
        console.warn("create was preesed")
        let result = await axios.post('http://172.20.10.2:3000/addGame',{}
            );
        console.log("gameid:" + result.data)
        if (result.status == 201)
        {
            navigation.navigate("WaitingForPlayers", {player:player, gameId:result.data})
        }
        else{
            console.log(result)
        }
    };

    const onJoinPressed = async (e, buttonId) => {
        //בעת לחיצה על כפתור הצטרפות למשחק שליחת בקשת פוסט לשרת המעדכנת את בסיס הנתונים ומעבר לעמוד המשחק
        console.warn("join was pressed", buttonId);
        await axios.post('http://172.20.10.2:3000/joinGame', {
        '_id': buttonId
        })
        navigation.navigate('Game', {player:player, gameId:buttonId})
    };

     const renderButtons = async ()=>{
         //יצירת הכפתורים של הצטרפות למשחק
         if(arr.length == 0)
         {
     await axios.get('http://172.20.10.2:3000/getGames').then((games) => { 
        let buttons = []
        for(let i=0; i<games.data.length; i++){
            if(games.data[i].player2)continue
                  let buttonText = "Join " + games.data[i].player1
                   buttons.push(<CustomButton 
                       text={buttonText}
                       onPress={(event) => onJoinPressed(event, games.data[i]._id)}
                       bobo={games.data[i]._id}
                       key={i}
                   />)
                }
                setArr(buttons)
            }
        
  )}}
    

    renderButtons(arr)

    return(
        <ScrollView>
        <View style={styles.root}>

            <CustomButton
            onPress={(event) => onCreatePressed(event, )}
            text='Create'
            />
            {arr}
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

export default HomeScreen