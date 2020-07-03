import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import CartItem from './CartItem';

const CartList = props => {

    const renderProductItem = itemData => {
        //console.log(itemData.item.title);
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
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderProductItem}
                style={{width: '100%'}}
            />
        </View>
    );
};

export default CartList;