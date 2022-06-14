import React, { useState, Component, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, webView, AsyncStorage, Image, Pressable, TouchableOpacity } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import GameButton from "../../components/GameButton";
import { useForm, Controller, get, set } from "react-hook-form";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { io } from "socket.io-client";
import BaffCard from "Autho/src/components/BaffCard";
import CatCard from "../../components/CatCard";
import ZebraCard from "../../components/ZebraCard";
import ElephantCard from "../../components/ElephantCard";
import MonkeyCard from "../../components/MonkeyCard";
import TigerCard from "../../components/TigerCard";
import EagleCard from "../../components/EagleCard";
import GiraffeCard from "../../components/GiraffeCard";
import GorillaCard from "../../components/GorillaCard";
import PenguinCard from "../../components/PenguinCard";
import WolfCard from "../../components/WolfCard";
import CowCard from "../../components/CowCard";
import ChickenCard from "../../components/ChickenCard";
import DogCard from "../../components/DogCard";
import FoxCard from "../../components/FoxCard";
import HippoCard from "../../components/HippoCard";
import MouseCard from "../../components/MouseCard";
import PandaCard from "../../components/PandaCard";

const Game = () => {
    const socket = io('http://172.20.10.2:3000');

    const [newCards, setNewCards] = useState([])
    const { control,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const route = useRoute()
    const player = route.params.player
    const gameId = route.params.gameId
    const [arr, setArr] = useState([]);
    const [card1, setCard1] = useState(-1)
    const [card2, setCard2] = useState(-1)
    const [a1Open, setA1Open] = useState(false)
    const [score1, setScore1] = useState(0)
    const [score2, setScore2] = useState(0)
    const [nextPlayer, setNextPlayer] = useState(1)
    const [inte, setInte] = useState(false)
    const [lastTime, setLastTime] = useState((new Date().getTime()) / 1000)
    const [text, setText] = useState("player 1 turn")
    const [idToCardMap, setIdToCardMap] = useState({})
    const [idToOpenMap, setIdToOpenMap] = useState({
        "A1": false, "B1": false, "C1": false, "D1": false, "E1": false, "F1": false, "G1": false, "H1": false, "I1": false, "J1": false, "K1": false, "L1": false, "M1": false, "N1": false, "O1": false, "P1": false, "Q1": false, "R1": false,
        "A2": false, "B2": false, "C2": false, "D2": false, "E2": false, "F2": false, "G2": false, "H2": false, "I2": false, "J2": false, "K2": false, "L2": false, "M2": false, "N2": false, "O2": false, "P2": false, "Q2": false, "R2": false
    })
    const onFlip = useCallback((id) => {
        console.log("flip", id, cards[id], a1Open, inte, nextPlayer)
        console.log("flip", id, cards[id], a1Open, inte, nextPlayer)
        setTimeout(() => { console.log("flip2000", id, cards[id], a1Open) }, 2000)
    }, [a1Open]);

    const cards = {
        "A1": <ZebraCard id={2} key={2} letter={"A1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={a1Open} />,
        "B1": <BaffCard id={3} key={3} letter={"B1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={a1Open} />,
        "C1": <CatCard id={4} key={4} letter={"C1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={a1Open} />,
        "D1": <TigerCard id={5} key={5} letter={"D1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={a1Open} />,
        "E1": <MonkeyCard id={6} key={6} letter={"E1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={a1Open} />,
        "F1": <ElephantCard id={7} key={7} letter={"F1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={a1Open} />,
        "G1": <EagleCard id={8} key={8} letter={"G1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["G1"]} />,
        "H1": <GiraffeCard id={9} key={9} letter={"H1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["H1"]} />,
        "I1": <GorillaCard id={10} key={10} letter={"I1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["I1"]} />,
        "J1": <PenguinCard id={1} key={1} letter={"J1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["J1"]} />,
        "K1": <WolfCard id={11} key={11} letter={"K1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["K1"]} />,
        "L1": <CowCard id={12} key={12} letter={"L1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["L1"]} />,
        "M1": <ChickenCard id={13} key={13} letter={"M1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["M1"]} />,
        "N1": <DogCard id={14} key={14} letter={"N1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["N1"]} />,
        "O1": <FoxCard id={15} key={15} letter={"O1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["O1"]} />,
        "P1": <HippoCard id={16} key={16} letter={"P1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["P1"]} />,
        "Q1": <MouseCard id={17} key={17} letter={"Q1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["Q1"]} />,
        "R1": <PandaCard id={18} key={18} letter={"R1"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["R1"]} />,
        "A2": <ZebraCard id={2} key={19} letter={"A2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["A2"]} />,
        "B2": <BaffCard id={3} key={20} letter={"B2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["B2"]} />,
        "C2": <CatCard id={4} key={21} letter={"C2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["C2"]} />,
        "D2": <TigerCard id={5} key={22} letter={"D2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["D2"]} />,
        "E2": <MonkeyCard id={6} key={23} letter={"E2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["E2"]} />,
        "F2": <ElephantCard id={7} key={24} letter={"F2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["F2"]} />,
        "G2": <EagleCard id={8} key={25} letter={"G2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["G2"]} />,
        "H2": <GiraffeCard id={9} key={26} letter={"H2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["H2"]} />,
        "I2": <GorillaCard id={10} key={27} letter={"I2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["I2"]} />,
        "J2": <PenguinCard id={1} key={28} letter={"J2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["J2"]} />,
        "K2": <WolfCard id={11} key={29} letter={"K2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["K2"]} />,
        "L2": <CowCard id={12} key={30} letter={"L2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["L2"]} />,
        "M2": <ChickenCard id={13} key={31} letter={"M2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["M2"]} />,
        "N2": <DogCard id={14} key={32} letter={"N2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["N2"]} />,
        "O2": <FoxCard id={15} key={33} letter={"O2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["O2"]} />,
        "P2": <HippoCard id={16} key={34} letter={"P2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["P2"]} />,
        "Q2": <MouseCard id={17} key={35} letter={"Q2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["Q2"]} />,
        "R2": <PandaCard id={18} key={36} letter={"R2"} enableFlip={player == nextPlayer} onFlip={onFlip} openCard={idToOpenMap["R2"]} />
    }
    function flip(key) {
        console.log(key)
        if (Object.keys(cards).length == 0) {
            console.log("here")
            return
        }

        console.log("flip", key, card1, card2)
        if (card1 == -1) {
            setCard1(key)
            return
        }
        if (card2 == -1) {
            setCard2(key)
            console.log(card1, card2)
            const keys = Object.keys(cards)
            keys.forEach((k) => {
                if (cards[k].key === card1) {
                    console.log(cards[k].cardFace)
                    console.log("flipping back", card1)
                    cards[k].flipLeft()
                }
            })

        }
    }


    const getGame = async () => {
        // socket.on("connect", () => {
        //     console.log(socket.id); // x8WIv7-mJelg7on_ALbx
        //   });
        // socket.emit('chat message', "hello");
        // console.log(arr)
        //אם כל האותיות קטנות המשחק נגמר
        //להוסיף אם הזמן עכשיו פחות הפעם האחרונה של הfetch גדול מ1000
        if (!arr || arr.length == 0) {
            await axios.get(`http://172.20.10.2:3000/getGame/${gameId}`).then((game) => {
                setArr(game.data.board)
                let was = []
                let cardsArr = []
                for (let i = 0; i < game.data.board.length; i++) {
                    const letter = game.data.board[i].toUpperCase();
                    if (!Exist(was, letter)) {
                        was.push(letter)
                        cardsArr.push(cards[`${letter}1`])
                        idToCardMap[cards[`${letter}1`].key] = `${letter}1`
                    }
                    else {
                        idToCardMap[cards[`${letter}2`].key] = `${letter}2`
                        cardsArr.push(cards[`${letter}2`])
                    }
                }
                setNewCards(cardsArr)
                setIdToCardMap(idToCardMap)
                setIdToOpenMap(idToOpenMap)
                console.log(newCards)
            })

        }

        function Exist(arr, c) {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == c)
                    return true
            }
            return false
        }
    }

    getGame();

    return (
        <ScrollView>
            <View width="100%" height="100%" style={styles.root}>
                {newCards}
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