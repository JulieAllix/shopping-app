import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';

import Colors from '../constants/Colors';

const EditUserProductsScreen = props => {
    const inputHandler = (enteredText) => {
        console.log('coucou');
    };

    return ( 
        <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    placeholder="" 
                    style={styles.input} 
                    onChangeText={inputHandler}
                    value=""
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Price</Text>
                <TextInput 
                    placeholder="" 
                    style={styles.input} 
                    onChangeText={inputHandler}
                    value=""
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput 
                    placeholder="" 
                    style={styles.input} 
                    onChangeText={inputHandler}
                    value=""
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Image url</Text>
                <TextInput 
                    placeholder="" 
                    style={styles.input} 
                    onChangeText={inputHandler}
                    value=""
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputsContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        marginTop: 15
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%'
    },
    label: {
        width: '35%',
        fontSize: 18,
        fontFamily: 'noto',
        color: Colors.primaryColor
    },
    input: {
        width: '63%', 
        borderColor: Colors.primaryColor, 
        borderBottomWidth: 1, 
        padding: 10,
        marginVertical: 20,
    },
});

export default EditUserProductsScreen;