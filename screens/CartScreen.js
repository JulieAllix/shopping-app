import React from 'react';
import { 
    View,
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';

import { FontAwesome5 } from '@expo/vector-icons'; 

import MyButton from '../components/MyButton';
import DefaultText from '../components/DefaultText';
import CartList from '../components/CartList';

const CartScreen = props => {
    const cartItems = useSelector(state => state.products.productsInCart);

    if (cartItems.length === 0 || !cartItems) {
        return (
            <View style={styles.contentVoidCart}>
                <DefaultText>Your cart is empty</DefaultText>
            </View>
        )
    }

    return ( 
        <View style={styles.contentFullCart}>
            <View style={styles.cartHeader}>
                <DefaultText>Total sum : €</DefaultText>
                <MyButton>Order</MyButton>
            </View>
            <CartList 
                listData={cartItems}
                navigation={props.navigation} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    contentVoidCart: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentFullCart: {
        flex: 1,
    },
    cartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 15,
    },
});

export default CartScreen;