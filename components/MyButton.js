import React, { useState, useEffect } from 'react';
import { 
    Dimensions, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Platform
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const MyButton = props => {
    let orientation = useSelector(state => state.screen.orientation);
    let screenWidth = useSelector(state => state.screen.width);

    return (
        <TouchableOpacity style={{
            ...styles.button, 
            width: orientation === 'vertical' ? screenWidth / 6 : screenWidth / 2.5,
            padding: orientation === 'vertical' ? 7 : 6,
            }} onPress={props.onPress}>
            <Text style={{
                ...styles.text,
                fontSize: orientation === 'vertical' ? 18 : 20,
            }}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.accentColor,
        marginVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        textAlign: 'center',
    },
});

export default MyButton;