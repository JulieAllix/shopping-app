import React from 'react';
import { 
    FlatList, 
    StyleSheet, 
    Text 
} from 'react-native';
import { useSelector } from 'react-redux';

import ProductsList from '../components/ProductsList';

const ProductsOverviewScreen = ({ navigation }) => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    
    return ( 
        <ProductsList 
            listData={availableProducts}
            //navigation={navigation} 
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

export default ProductsOverviewScreen;