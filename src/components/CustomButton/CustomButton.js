import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ( { onPress, text, type = 'PRIMARY', bgColor, fgColor, bobo = 0} ) => {
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
        width: '100%',

        padding: 15,
        marginVertical: 10,
        
        alignItems: 'center',
        borderRadius: 5,
    },
    text: {
        fontWeight: 'bold',
    },

    text_PRIMARY: {
        color: 'white',
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
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

export default CustomButton