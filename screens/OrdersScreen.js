import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import OrdersList from '../components/Orders/OrdersList';
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
        <OrdersList 
            listData={orders}
            navigation={props.navigation} 
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