import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TouchableOpacity } from 'react-native';
import GestureFlipView from 'react-native-gesture-flip-card';


import GiraffeImage from 'Autho/assets/Giraffe.svg';
import GorillaImage from 'Autho/assets/Gorilla.svg';
import HippoImage from 'Autho/assets/Hippo.svg';
import BaffImage from 'Autho/assets/Buffalo.svg';
import CatImage from 'Autho/assets/Cat.svg';
import ChickenImage from 'Autho/assets/Chicken.svg';
import CowImage from 'Autho/assets/Cow.svg';
import DogImage from 'Autho/assets/Dog.svg';
import EagleImage from 'Autho/assets/Eagle.svg';
import ElephantImage from 'Autho/assets/Elephant.svg';
import FoxImage from 'Autho/assets/Fox.svg';
import MonkeyImage from 'Autho/assets/Monkey.svg';
import MouseImage from 'Autho/assets/Mouse.svg';
import PandaImage from 'Autho/assets/Panda.svg';
import PenguinImage from 'Autho/assets/Penguin.svg';
import TigerImage from 'Autho/assets/Tiger.svg';
import WolfImage from 'Autho/assets/Wolf.svg';
import ZebraImage from 'Autho/assets/Zebra.svg';

const mapLetterToImage = {
  "A": GiraffeImage,
  "B": GorillaImage,
  "C": HippoImage,
  "D": BaffImage,
  "E": CatImage,
  "F": ChickenImage,
  "G": CowImage,
  "H": DogImage,
  "I": EagleImage,
  "J": ElephantImage,
  "K": FoxImage,
  "L": MonkeyImage,
  "M": MouseImage,
  "N": PandaImage,
  "O": PenguinImage,
  "P": TigerImage,
  "Q": WolfImage,
  "R": ZebraImage
};

//קומפוננטה של קלף למשחק
const GameCard = ({ letter, onClick, isFlipped }) => {
  const [lastFlipped, setLastFlipped] = useState(null);
  const viewRef = useRef();
  const setOpacityTo = useCallback((value) => {
    // Redacted: animation related code
    viewRef.current.setNativeProps({
      opacity: value
    });
  }, []);

  const renderFront = () => {
    //יצירת החלק הקידמי של הקלף
    const SvgImage = mapLetterToImage[letter];
    return <SvgImage width="92px" height="92px" />
  };

  const renderBack = useMemo(() => {
    //יצירת החלק האחורי של הקלף
    return (
      <Image style={styles.img} source={require("Autho/assets/cardBack.png")} />
    );
  }, [letter]);

  const cardRef = useRef();

  useEffect(() => {
    //הפיכת הקלף בלחיצה עליו
    return viewRef.current.flipLeft();
    console.log('check if need to flip', letter, lastFlipped, isFlipped)
    if (!lastFlipped) return setLastFlipped(isFlipped);
    if (isFlipped != lastFlipped) {
      console.log('flip card')
      viewRef.current.flipLeft();
      setLastFlipped(isFlipped)
    }    
  }, [isFlipped, lastFlipped]);

  return (
    <TouchableOpacity ref={(ref) => (cardRef.current = ref)} onPress={onClick}>
      <GestureFlipView ref={(ref) => (viewRef.current = ref)} width={92} height={90} >
        {renderFront()}
        {renderBack}
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

export default GameCard;