import React from 'react';
import { useSelector } from 'react-redux';
import { 
    View,
    StyleSheet,
    Text
} from 'react-native';

import ProductsList from '../components/ProductsList';

const UserProductsOverviewScreen = ({ navigation }) => {
    const availableProducts = useSelector(state => state.products.availableProducts);

    return ( 
        <ProductsList  
            listData={availableProducts}
            navigation={navigation}
            screen="UserProducts" 
        />
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default UserProductsOverviewScreen;