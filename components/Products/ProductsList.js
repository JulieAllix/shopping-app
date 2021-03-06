import React, { useEffect } from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet,
    Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as productActions from '../../store/actions/products';

import ProductItem from './ProductItem';

const ProductsList = props => {

    let orientation = useSelector(state => state.screen.orientation);
    let cartItems = useSelector(state => state.products.productsInCart);
    const dispatch = useDispatch();

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

    return (
        <View style={styles.list}>
            <FlatList 
            /*
                onRefresh={props.loadProducts}
                refreshing={props.isRefreshing}
                */
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
});

export default ProductsList;
