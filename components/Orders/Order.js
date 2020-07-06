import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { toggleOrderDetails } from '../../store/actions/orders';

import OrderItem from './OrderItem';
import OrderItemsList from './OrderItemsList';

import MyButton from '../MyButton';
import Colors from '../../constants/Colors';
import DefaultText from '../DefaultText';

const Order = props => {
    const orderId = props.order.item.id;
    var d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const fullDate = date + '/' + month + '/' + year;

    const ordersList = useSelector(state => state.orders.orders);
    const currentOrder = ordersList.find(order => order.id === orderId);
    const isOrderExpanded = currentOrder.expandOrder;

    const dispatch = useDispatch();
    const buttonHandler = (id, bool) => {
        dispatch(toggleOrderDetails(id, bool));
    };

    return (
        <View style={styles.orderContainer}>
            <View style={styles.orderRow}>
                <DefaultText>Sum</DefaultText>
                <DefaultText>{fullDate}</DefaultText>
            </View>
            {isOrderExpanded ?
            <View style={styles.orderDetails}> 
                <OrderItemsList
                    order={props.order.item.content}
                />
                <View style={styles.buttonContainer}>
                    <MyButton
                        onPress={
                            () => {
                                buttonHandler(orderId, false);
                            }
                        }
                    >
                        Close
                    </MyButton>
                </View> 
            </View> 
            : 
            <View>
                <View style={styles.buttonContainer}>
                    <MyButton
                        onPress={
                            () => {
                                buttonHandler(orderId, true);
                            }
                        }
                    >
                        More
                    </MyButton>
                </View>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    orderContainer: {
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        margin: 15,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    orderDetails: {
        marginTop: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Order;