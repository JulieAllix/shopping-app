import React from 'react';
import { 
    View,
    StyleSheet
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'; 

import DefaultText from '../components/DefaultText';

const CartItem = props => {
    
    return ( 
        <View style={styles.cartContent}>
            <DefaultText>1 x Bono the Bonzaï</DefaultText>
            <DefaultText>24.49€</DefaultText>
            <FontAwesome5 name="trash" size={24} color="black" />
        </View>
    );
};

const styles = StyleSheet.create({
    cartContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    }
});

export default CartItem;