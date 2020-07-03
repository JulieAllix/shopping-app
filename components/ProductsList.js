import React from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/actions/products';

import ProductItem from './ProductItem';

const ProductsList = props => {
    let cartItems = useSelector(state => state.products.productsInCart);
    const dispatch = useDispatch();
    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
    };


    const renderProductItem = (itemData) => {
        const productId = itemData.item.id;

        return (
            <ProductItem
                id={itemData.item.id}
                title={itemData.item.title}
                description={itemData.item.description}
                price={itemData.item.price}
                imageUrl={itemData.item.imageUrl}
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
                        addToCartHandler(productId);
                        props.navigation.navigate(
                            'Cart', 
                            {id: itemData.item.id}
                        );
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
