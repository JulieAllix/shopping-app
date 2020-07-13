import React from 'react';
import { useSelector } from 'react-redux';

import ProductsList from '../components/Products/ProductsList';

const ProductsOverviewScreen = ({ navigation }) => {
    const availableProducts = useSelector(state => state.products.availableProducts);

    return ( 
        <ProductsList  
            listData={availableProducts}
            navigation={navigation} 
            screen="Products"
        />
    );
};

export default ProductsOverviewScreen;