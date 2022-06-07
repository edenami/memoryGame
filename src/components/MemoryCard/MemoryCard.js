import React, { useState, useRef, useCallback, useEffect} from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import GestureFlipView from 'react-native-gesture-flip-card';
import io from "socket.io-client";

const renderFront = () => {
    return (
        <></> 
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

const MemoryCard = ({id=-1,enableFlip, renderFront, onFlip, openCard, letter}) => {
  const viewRef = useRef();
  const setOpacityTo = useCallback((value) => {
    // Redacted: animation related code
    viewRef.current.setNativeProps({
      opacity: value
    });
  }, []);
  const cardRef = useRef();
  useEffect(()=> {console.log(letter, 'open', openCard)}, [openCard])
  const onPress = () =>{
    viewRef.current.flipRight()
  }
  const onEnd=()=>{
      onFlip(letter)
    }
  
    return(
      <TouchableOpacity onPress={onPress}  disabled={enableFlip} ref={(ref) => (cardRef.current = ref)} openCard={openCard}>
                <GestureFlipView ref={(ref) => (viewRef.current = ref)} width={92} height={90} enableFlip={false} onFlipEnd={onEnd}>
        {renderBack()}
        {renderFront()}
        </GestureFlipView>
        </TouchableOpacity>
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

export default MemoryCard;