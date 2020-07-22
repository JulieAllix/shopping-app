import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { toggleOrderDetails } from '../../store/actions/orders';

import OrderItemsList from './OrderItemsList';

import MyButton from '../MyButton';
import Colors from '../../constants/Colors';
import DefaultText from '../DefaultText';

const Order = props => {
    const orderId = props.id;
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
                <DefaultText>{props.sum.toFixed(2)}€</DefaultText>
                <DefaultText>{props.date}</DefaultText>
            </View>
            {isOrderExpanded ?
            <View style={styles.orderDetails}> 
                <OrderItemsList
                    order={props.content}
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
                        Show Details
                    </MyButton>
                </View>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    orderContainer: {
        elevation: 5,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 20,
        padding: 10,
    },
    orderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderDetails: {
        marginTop: 10
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
});

export default Order;