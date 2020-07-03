import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const CartItem = props => {
    
    return ( 
        <View style={styles.cartContent}>
            <Text style={{...styles.item, ...props.style}}>{props.qty} x {props.item}</Text>
            <Text>{props.price}€</Text>
            <FontAwesome5   
                name="trash" 
                size={24} 
                color={Colors.primaryColor}
                onPress={props.onClickOnTrash}
            />
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
    item: {
        width: '40%',
        fontFamily: 'noto',
        textAlign: 'center',
        marginHorizontal: 10,
        fontSize: 16,
        color: Colors.primaryColor, 
    }
});

export default CartItem;