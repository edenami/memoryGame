import React, { useState, useRef, useCallback} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import SVGImg from 'Autho/assets/Panda.svg';
import GestureFlipView from 'react-native-gesture-flip-card';
import io from "socket.io-client";
import MemoryCard from "../MemoryCard";

const renderFront = () => {
    return (
        <SVGImg width="92px" height="92px"/> 
    );
  };
  const renderBack = () => {
    return (
        <Image style={styles.img}source={require('Autho/assets/cardBack.png')}/>
    );
  };

  // function EndOfFlip(){
  //   const [lastTime, setLastTime] = useState(0)
  //     setLastTime(new Date().getTime())
  //   if((new Date().getTime()) - lastTime >= 10000)
  //   {
  //     console.log(viewRef.current)
  //     if(viewRef.current.key)
  //       viewRef.current.flipLeft();
  //   }
  // }

const BaffCard =  ({id=-1,enableFlip, onFlip, openCard, letter}) => {
  
    return(
      <MemoryCard id={id} renderFront={renderFront} onFlip={onFlip} enableFlip={enableFlip} openCard={openCard} letter={letter}>
        </MemoryCard>
    )
}

export default BaffCard;