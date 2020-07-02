import React from 'react';
import { 
    View,
    StyleSheet,
    Text
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'; 

import MyButton from '../components/MyButton';
import DefaultText from '../components/DefaultText';
import CartItem from '../components/CartItem';

const CartScreen = props => {
    
    return ( 
        <View>
            <View style={styles.cartHeader}>
                <DefaultText>Total sum : €</DefaultText>
                <MyButton>Order</MyButton>
            </View>
            <CartItem
                qty="1"
                item="Bono the Bonzaï"
                price="24.49"
            />
            <CartItem
                qty="2"
                item="Hervé the nice plant"
                price="10.99"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    cartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    },
});

export default CartScreen;