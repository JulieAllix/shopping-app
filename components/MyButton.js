import React from 'react';
import {  
    Text, 
    TouchableOpacity, 
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const MyButton = props => {
    let orientation = useSelector(state => state.screen.orientation);
    let screenWidth = useSelector(state => state.screen.width);

    return (
        <TouchableOpacity style={{
            ...styles.button, 
            width: orientation === 'vertical' ? screenWidth / 3 : screenWidth / 4.5,
            padding: orientation === 'vertical' ? 7 : 5,
            }} onPress={props.onPress}>
            <Text style={{
                ...styles.text,
                fontSize: orientation === 'vertical' ? 18 : 16,
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