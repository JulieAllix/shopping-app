import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    View, 
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';

import * as productActions from '../store/actions/products';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import MyButton from '../components/MyButton';
import ProductsList from '../components/Products/ProductsList';

const ProductsOverviewScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const availableProducts = useSelector(state => state.products.availableProducts);

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
            console.log('je suis dans catch err')
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    if (error) {
        return (
            <View style={styles.centered}>
                <DefaultText>An error occurred !</DefaultText>
                <MyButton onPress={loadProducts}>Try again !</MyButton>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator 
                    size='large' 
                    color={Colors.primaryColor}
                />
            </View>
        )
    }

    if (!isLoading && availableProducts.length === 0) {
        return (
            <View style={styles.centered}>
                <DefaultText>No products found.</DefaultText>
                <DefaultText>Maybe start adding some !</DefaultText>
            </View>
        );
    }

    return ( 
        <ProductsList  
            listData={availableProducts}
            navigation={navigation} 
            screen="Products"
        />
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsOverviewScreen;