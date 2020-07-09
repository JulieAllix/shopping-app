import React, { useState, useEffect } from 'react';
import { 
    Dimensions, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
    Platform
} from 'react-native';

import Colors from '../constants/Colors';

const MyButton = props => {
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 3.4);

    useEffect(() => {
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 3.4);
        };
    
        Dimensions.addEventListener('change', updateLayout);
        
        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });

    return (
        <TouchableOpacity style={{...styles.button, width:buttonWidth}} onPress={props.onPress}>
            <Text style={styles.text}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.accentColor,
        padding: Dimensions.get('window').width < 400 ? 5 : 8,
        marginVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: Dimensions.get('window').width < 400 ? 18 : 20,
    },
});

export default MyButton;