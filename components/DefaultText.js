import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../constants/Colors';

const DefaultText = props => {
    let orientation = useSelector(state => state.screen.orientation);
    let screenWidth = useSelector(state => state.screen.width);
    return (
        <Text 
            style={{
                ...styles.text,
                fontSize: (screenWidth < 540 && orientation === 'horizontal') ? 14 : 16,
            }}
        >
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'noto',
        textAlign: 'center',
        marginHorizontal: 10,
        color: Colors.primaryColor
    }
});

export default DefaultText;