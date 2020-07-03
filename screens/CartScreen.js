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
import CartItem from '../components/CartItem';

const CartScreen = props => {
    const cartItems = useSelector(state => state.products.productsInCart);

    if (cartItems.length === 0 || !cartItems) {
        return (
            <View style={styles.content}>
                <DefaultText>Your cart is empty</DefaultText>
            </View>
        )
    }

    const renderProductItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
        return (
            <CartItem 
                qty='1'
                id={itemData.item.id}
                item={itemData.item.title} 
                price={itemData.item.price} 
            />
        );
    };

    return ( 
        <View>
            <View style={styles.cartHeader}>
                <DefaultText>Total sum : €</DefaultText>
                <MyButton>Order</MyButton>
            </View>
            <View style={styles.list}>
                <FlatList 
                    data={cartItems}
                    keyExtractor={(item, index) => item.id}
                    renderItem={renderProductItem}
                    style={{width: '100%'}}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
});

export default CartScreen;