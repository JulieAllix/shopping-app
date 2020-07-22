import React from 'react';
import { 
    View,
    StyleSheet,
    FlatList
} from 'react-native';
import { useSelector } from 'react-redux';

import Order from '../components/Orders/Order';
import DefaultText from '../components/DefaultText';

const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    if (orders.length === 0 || !orders) {
        return (
            <View style={styles.contentVoidOrders}>
                <DefaultText>You don't have any orders.</DefaultText>
            </View>
        )
    }

    return ( 
        <FlatList 
            data={orders}
            keyExtractor={(item, index) => item.id}
            renderItem={itemData => (
                <Order 
                    id={itemData.item.id}
                    sum={itemData.item.sum}
                    date={itemData.item.readableDate}
                    content={itemData.item.content}
                    isOrderExpanded={itemData.item.expandOrder}
                />
            )}
            style={{width: '100%'}}
        />
    );
};

const styles = StyleSheet.create({
    contentVoidOrders: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default OrdersScreen;