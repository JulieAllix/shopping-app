import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import OrderItemsList from './OrderItemsList';

import MyButton from '../MyButton';
import Colors from '../../constants/Colors';
import DefaultText from '../DefaultText';

const Order = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={styles.orderContainer}>
            <View style={styles.orderRow}>
                <DefaultText>{props.sum.toFixed(2)}€</DefaultText>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            {showDetails ?
            <View style={styles.orderDetails}> 
                <OrderItemsList
                    order={props.content}
                />
                <View style={styles.buttonContainer}>
                    <MyButton
                        onPress={
                            () => {
                                setShowDetails(prevState => !prevState);
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
                                setShowDetails(prevState => !prevState);
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
    date: {
        color: 'grey',
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