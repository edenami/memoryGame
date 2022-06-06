import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const GameButton = ( { onPress, text, type = 'PRIMARY', bgColor, fgColor, bobo = 0} ) => {
    return(
        <Pressable onPress={onPress} bobo={bobo} style={[
            styles.container,
            styles[`container_${type}`],
            bgColor ? {backgroundColor: bgColor} : {}
            ]}>
            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        padding: 15,
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        borderRadius: 5,
        margin: 10
    },
    text: {
        fontWeight: 'bold',
        fontSize: 6
    },

    text_PRIMARY: {
        color: 'white',
    },

    container_PRIMARY: {
        backgroundColor: 'green',
    },

    container_TERTIARY: {},

    text_TERTIARY: {
        color: 'grey',
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },
});

export default GameButton