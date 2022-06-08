import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, AsyncStorage, Image, Pressable, TouchableOpacity } from 'react-native';
import { useForm, Controller, get, set } from "react-hook-form";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";
import MemoryCard from "../../components/MemoryCard";
import GameCard from "../../components/GameCard";
import useInterval from 'use-interval'

const Game = () => {
    //const socket = io('http://10.100.102.12:3000');

    const [gameCards, setGameCards] = useState([]);
    const [flippedCard, setFlippedCard] = useState(null);
    const [isPlayerTurn, setIsPlayerTurn] = useState(false);
    const [hasPlayerFlipped, setHasPlayerFlipped ] = useState(false);
    const [text, setText] = useState("Your turn");
    const route = useRoute()
    const player = route.params.player
    const gameId = route.params.gameId

    useEffect(() => {
        const interval = setInterval(async () => {
            if (isPlayerTurn) return;
            result = await axios.get(`http://10.100.102.12:3000/getPlayer/${gameId}`)
            const { nextPlayer, opponentCard } = result.data;            
            if (flippedCard !== opponentCard) setFlippedCard(opponentCard);
            console.log('current player: ', nextPlayer)
            if (nextPlayer === player) {
                setIsPlayerTurn(true);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setText(isPlayerTurn ? `${player} turn` : "Opponent turn");
    }, [isPlayerTurn]);

    const runGameLogic = useCallback(id => {
        // find the card with id  in gameCards, and set it flipped        
        // if thre is  flippedCard = run comparision
        // else save  flippedCard state
        gameCards.forEach(card => {
            if (card.id === id) {
                // if already flipped: ignore
                if (card.isFlipped) return;
                // set card as flipped
                card.isFlipped = true;
                // if no flipped card - set as current flipped
                if (!flippedCard) return setFlippedCard(card);
                // if there is flipped card - compare
                // if found similar card: give points
                if (flippedCard.letter === card.letter) {
                    // todo: give player points only if its player turn
                    console.log('yaay player found a card')
                } else {
                    // if not similar: flip back the cards
                    setTimeout(() => {
                        console.log('not a match')
                        flippedCard.isFlipped = false;
                        card.isFlipped = false;
                    }, 2000);
                }
                // after two flips - reset flippedCard
                setFlippedCard(null);
            }
        })        
    }, [flippedCard, gameCards]);

    const sendLogicToServer = useCallback (async (id) => {
        let flippedTwice = false;
        // if player flipped twice
        if (hasPlayerFlipped) {
            setHasPlayerFlipped(false);
            flippedTwice = true;
        }
        console.log('calling server with card', id, flippedTwice)
        await axios.post(`http://10.100.102.12:3000/flipped/${gameId}`, {
                card: id,
                flippedTwice
            });
    }, []);

    const onFlip = useCallback(id => {
        if (!isPlayerTurn) return console.log('not player turn');
        sendLogicToServer(id);
        setHasPlayerFlipped(true);
        runGameLogic(id);
    }, [flippedCard]);

    const getGame = async () => {
        // socket.on("connect", () => {
        //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        //   });
        // socket.emit('chat message', "hello");
        if (!gameCards.length) {
            const cardsArr = [];
            // get cards from server
            console.log('calling server')
            await axios.get(`http://10.100.102.12:3000/getGame/${gameId}`).then((game) => {
                game.data.board.forEach((letter, id) => {
                    cardsArr.push({
                        id,
                        letter,
                        isFlipped: false
                    });
                });
                setGameCards(cardsArr)
            })
        }
    }

    useEffect(() => {
        console.log('loading game')
        getGame();
    }, []);

    const renderCards = useCallback(() => {
        if (!gameCards.length) return null;
        return gameCards.map(card => {
            return <GameCard key={card.id} letter={card.letter} onClick={() => onFlip(card.id)} isFlipped={card.isFlipped} />
        });
    }, [gameCards, GameCard, flippedCard]);

    return (
        <ScrollView>
            <View width="100%" height="100%" style={styles.root}>
                {renderCards()}
            </View>

            <Text>{text}</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 10
    },
    root: {
        alignItems: 'center',
        padding: 20,
        flexDirection: 'row',
        flexWrap: "wrap",
        flex: 1
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

export default Game