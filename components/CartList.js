import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../store/actions/products';

import CartItem from './CartItem';

const CartList = props => {

    const dispatch = useDispatch();
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const renderCartItem = itemData => {
        //console.log(itemData.item.title);
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
        <View>
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderCartItem}
                style={{width: '100%'}}
            />
        </View>
    );
};

export default CartList;