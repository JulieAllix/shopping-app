import React from 'react';
import { 
    View,
    Text,
    StyleSheet
} from 'react-native';
import { useSelector } from 'react-redux';

import { FontAwesome5 } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const CartItem = props => {
    const qtiesData = useSelector(state => state.products.qtiesInCart);

    return ( 
        <View style={styles.cartContent}>
            <Text style={styles.regular}>{props.qty} x</Text>
            <Text style={{...styles.item, ...props.style}}>{props.item}</Text>
            <Text style={styles.regular}>{props.price}€</Text>
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

export default CartItem;