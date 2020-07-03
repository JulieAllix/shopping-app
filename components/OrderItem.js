import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import Colors from '../constants/Colors';

const OrderItem = props => {

    return ( 
        <View style={styles.cartContent}>
            <Text style={styles.regular}>1 x</Text>
            <Text style={{...styles.item, ...props.style}}>{props.item}</Text>
            <Text style={styles.regular}>{props.price}€</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cartContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
        marginHorizontal: 15
    },
    regular: {
        color: Colors.primaryColor, 
    },
    item: {
        width: '35%',
        fontFamily: 'noto',
        textAlign: 'center',
        marginHorizontal: 10,
        fontSize: 16,
        color: Colors.primaryColor, 
    }
});

export default OrderItem;