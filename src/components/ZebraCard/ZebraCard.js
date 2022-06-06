import React, { useState, useRef, useCallback} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import SVGImg from 'Autho/assets/Zebra.svg';
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

const ZebraCard =  ({id=-1,enableFlip, onFlip, openCard, letter}) => {
  const viewRef = useRef();
  const setOpacityTo = useCallback((value) => {
    // Redacted: animation related code
    viewRef.current.setNativeProps({
      opacity: value
    });
  }, []);
  const [executed, setExecuted] = useState(false)
  const onPress = () =>{
    viewRef.current.flipRight()
  }
  const onEnd=()=>{
    setExecuted(false)
    if(!executed)
    {
    setExecuted(true)
    viewRef.current.flipRight()
    return
    }
  }
  return(
    <MemoryCard id={id} renderFront={renderFront} onFlip={onFlip} enableFlip={enableFlip} openCard={openCard} letter={letter}>
      </MemoryCard>
  )
}

const styles = StyleSheet.create({
    img: {
        flex: 1,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }
});

export default ZebraCard;