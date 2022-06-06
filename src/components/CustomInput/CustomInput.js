import React, {useState} from "react";
import { Controller } from "react-hook-form";
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry}) => {
    return (       
        <Controller
        name={name}
        rules={rules}
        control={control}
        render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
            <>
            <View 
                style={[styles.container, {borderColor: error ? 'red' : '#e8e8e8'}]}>
            <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            style={styles.input}
            secureTextEntry={secureTextEntry}
            />
            </View>
            {error && (<Text style={{color: 'red'}}>Error</Text>)}
            </>
        )}
       />
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: ' white',
        width: '100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {},
});

export default CustomInput