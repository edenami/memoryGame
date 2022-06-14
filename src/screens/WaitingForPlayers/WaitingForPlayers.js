import React, { useState, Component, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, webView } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import Terms from "../../components/Terms/Terms";
import SocialSignInButtons from "../../components/SocialSignInButton/SocialSignInButtons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';

const WaitingForPlayers = () => {

    const route = useRoute()
    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(async () => {
            let result = await axios.get(`http://172.20.10.2:3000/getGame/${route.params.gameId}`);
            if ((typeof result.data.player2 != 'undefined')) {
                clearInterval(interval);
                navigation.navigate("Game", { player: route.params.player, gameId: route.params.gameId })
            }
        }, 3000);
        return () => clearInterval(interval);
    }, [])

    return (
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