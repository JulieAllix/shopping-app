import React from 'react';
import { Text, StyleSheet } from 'react-native';

const SubtitleText = props => {
    return (
        <Text style={styles.text}>{props.children}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'noto-b',
        textAlign: 'center',
        marginHorizontal: 10,
        fontSize: 22,
    }
});

export default SubtitleText;