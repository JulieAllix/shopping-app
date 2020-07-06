import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import OrderItem from './OrderItem';

const OrderList = props => {

    const renderOrderItem = itemData => {
        return (
            <OrderItem 
                id={itemData.item.id}
                title={itemData.item.title} 
                price={itemData.item.price} 
                qty={itemData.item.qty} 
            />
        );
    };

    return (
        <View>
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderOrderItem}
                style={{width: '100%'}}
            />
        </View>
    );
};

export default OrderList;