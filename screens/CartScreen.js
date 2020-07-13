import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; 

import { createOrder } from '../store/actions/orders';
import { emptyCart } from '../store/actions/products';

import MyButton from '../components/MyButton';
import DefaultText from '../components/DefaultText';
import CartList from '../components/Cart/CartList';

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['VirtualizedLists should never be nested']);

const CartScreen = props => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.products.productsInCart);
    const totalPrice = useSelector(state => state.products.totalPrice);

    const handleOrderButton = () => {
        dispatch(createOrder(cartItems, totalPrice));
        dispatch(emptyCart());
    };

    if (cartItems.length === 0 || !cartItems) {
        return (
            <View style={styles.contentVoidCart}>
                <DefaultText>Your cart is empty</DefaultText>
            </View>
        )
    }

    return ( 
        <ScrollView>
            <View style={styles.contentFullCart}>
                <View style={styles.cartHeader}>
                    <DefaultText>Total sum : {totalPrice} €</DefaultText>
                    <MyButton
                        onPress={handleOrderButton}
                    >
                        Order
                    </MyButton>
                </View>
                <CartList 
                    listData={cartItems}
                    navigation={props.navigation} 
                />
            </View>
        </ScrollView>
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
        marginHorizontal: 10,
        marginBottom: 15,
    },
    cartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 15,
    },
});

export default CartScreen;