import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Order from './Order';

const OrdersList = props => {

    const renderOrderItem = itemData => {
        return (
            <Order 
                order={itemData}
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

export default OrdersList;