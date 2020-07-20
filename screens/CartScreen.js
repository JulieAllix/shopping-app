import React from 'react';
import { 
    ScrollView,
    View,
    StyleSheet,
    Text,
    FlatList
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; 

import { createOrder } from '../store/actions/orders';
import { removeFromCart, emptyCart } from '../store/actions/products';

import MyButton from '../components/MyButton';
import DefaultText from '../components/DefaultText';
import CartItem from '../components/CartItem';

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
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    if (cartItems.length === 0 || !cartItems) {
        return (
            <View style={styles.contentVoidCart}>
                <DefaultText>Your cart is empty</DefaultText>
            </View>
        )
    }

    const renderCartItem = itemData => {
        return (
            <CartItem 
                id={itemData.item.id}
                item={itemData.item.title} 
                price={itemData.item.price} 
                qty={itemData.item.qty} 
                onClickOnTrash={
                    () => {
                        removeFromCartHandler(itemData.item.id);
                    }
                }
            />
        );
    };

    return ( 
        <ScrollView>
            <View style={styles.contentFullCart}>
                <View style={styles.cartHeader}>
                    <DefaultText>Total sum : <Text style={styles.amount}>{totalPrice.toFixed(2)}€</Text></DefaultText>
                    <MyButton
                        onPress={handleOrderButton}
                    >
                        Order
                    </MyButton>
                </View>
                <FlatList 
                    data={cartItems}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderCartItem}
                    style={{width: '100%'}}
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
    amount: {
        fontSize: 20,
    }
});

export default CartScreen;