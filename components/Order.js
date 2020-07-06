import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { toggleOrderDetails } from '../store/actions/orders';

import OrderItem from '../components/OrderItem';
import MyButton from '../components/MyButton';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const Order = props => {

    var d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const fullDate = date + '/' + month + '/' + year;

    
const isOrderExpanded = useSelector(state => state.orders.expandOrder);

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
                
                <View style={styles.buttonContainer}>
                    <MyButton
                        onPress={
                            () => {
                                buttonHandler(1, false);
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
                                buttonHandler(1, true);
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