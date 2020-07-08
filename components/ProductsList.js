import React from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { 
    addToCart, 
    setTitle, 
    setDescription, 
    setImageUrl,
    setPriceStatus,
    setEditMode,
    deleteProduct,
} from '../store/actions/products';

import ProductItem from './ProductItem';

const ProductsList = props => {
    let cartItems = useSelector(state => state.products.productsInCart);
    const dispatch = useDispatch();

    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
    };

    const editHandler = (productTitle, productDescription, productImageUrl, productId) => {
        dispatch(setTitle(productTitle));
        dispatch(setDescription(productDescription));
        dispatch(setImageUrl(productImageUrl));
        dispatch(setPriceStatus(false));
        dispatch(setEditMode(productId));
    };

    const deleteHandler = (productId) => {
        dispatch(deleteProduct(productId));
    };

    const renderProductItem = (itemData) => {
        const productId = itemData.item.id;
        const productTitle = itemData.item.title;
        const productDescription = itemData.item.description;
        const productImageUrl = itemData.item.imageUrl;

        return (
            <ProductItem
                id={productId}
                title={productTitle}
                description={productDescription}
                price={itemData.item.price}
                imageUrl={productImageUrl}
                screen={props.screen}
                onSelectedItem={
                    () => {
                        props.navigation.navigate(
                            'ProductDetails', 
                            {id: productId}
                        );
                    }
                }
                onClickOnDetails={
                    () => {
                        props.navigation.navigate(
                            'ProductDetails', 
                            {id: productId}
                        )
                    }
                }
                onClickOnCart={
                    () => {
                        addToCartHandler(productId);
                        props.navigation.navigate(
                            'Cart', 
                            {id: productId}
                        );
                    }
                }
                onClickOnEdit={
                    () => {
                        editHandler(productTitle, productDescription, productImageUrl, productId);
                        props.navigation.navigate('Edit');
                    }
                }
                onClickOnDelete={
                    () => {
                        deleteHandler(productId);
                    }
                }
            />
        );
    };
    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderProductItem}
                style={{width: '100%'}}
                screen={props.screen}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    }
});

export default ProductsList;
