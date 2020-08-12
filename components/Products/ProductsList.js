import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';

import Colors from '../../constants/Colors';
import MyButton from '../MyButton';
import ProductItem from './ProductItem';
import DefaultText from '../DefaultText';

const ProductsList = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    let orientation = useSelector(state => state.screen.orientation);
    let cartItems = useSelector(state => state.products.productsInCart);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        loadProducts();
    }, [dispatch, loadProducts]);

    let numColumns;

    if (orientation === 'vertical') {
        numColumns = 1;
    } else if (orientation === 'horizontal') {
        numColumns = 2;
    };

    const addToCartHandler = (productId) => {
        dispatch(productActions.addToCart(productId));
    };

    const editHandler = (
        productTitle, 
        productDescription, 
        productImageUrl, 
        productId) => {
        // This action sends the product info to pre-fill the inputs and removes the price input
        dispatch(productActions.setProductInfo(productTitle, productDescription, productImageUrl, false, productId));
    };

    const deleteHandler = (productId) => {
        Alert.alert(
            'Are you sure ?',
            'Do you really want to delete this item ?',
            [
                {text: 'No', style: 'default'},
                {
                    text: 'Yes', 
                    style: 'destructive', 
                    onPress: () => {
                    dispatch(productActions.deleteProduct(productId));
                    }
                }
            ]);
    };

    const renderProductItem = (itemData) => {

        return (
            <ProductItem
                id={itemData.item.id}
                title={itemData.item.title}
                description={itemData.item.description}
                price={itemData.item.price}
                imageUrl={itemData.item.imageUrl}
                screen={props.screen}
                onSelectedItem={
                    () => {
                        props.navigation.navigate(
                            'ProductDetails', 
                            {id: itemData.item.id}
                        );
                    }
                }
                onClickOnDetails={
                    () => {
                        props.navigation.navigate(
                            'ProductDetails', 
                            {id: itemData.item.id}
                        )
                    }
                }
                onClickOnCart={
                    () => {
                        addToCartHandler(itemData.item.id);
                        props.navigation.navigate(
                            'Cart', 
                            {id: itemData.item.id}
                        );
                    }
                }
                onClickOnEdit={
                    () => {
                        editHandler(
                            itemData.item.title, 
                            itemData.item.description, 
                            itemData.item.imageUrl,
                            itemData.item.id
                        );
                        props.navigation.navigate('Edit');
                    }
                }
                onClickOnDelete={
                    () => {
                        deleteHandler(itemData.item.id);
                    }
                }
            />
        );
    };

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

    if (!isLoading && props.listData.length === 0) {
        return (
            <View style={styles.centered}>
                <DefaultText>No products found.</DefaultText>
                <DefaultText>Maybe start adding some !</DefaultText>
            </View>
        );
    }

    return (
        <View style={styles.list}>
            <FlatList 
                key={numColumns}
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderProductItem}
                contentContainerStyle={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                screen={props.screen}
                numColumns={numColumns}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        padding: 10,
    },
    centered: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductsList;
