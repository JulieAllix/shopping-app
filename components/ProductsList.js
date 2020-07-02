import React from 'react';
import { 
    View, 
    FlatList, 
    StyleSheet
} from 'react-native';

import ProductItem from './ProductItem';

const ProductsList = props => {
    const renderShopItem = (itemData) => {
        return (
            <ProductItem
                title={itemData.item.title}
                description={itemData.item.description}
                price={itemData.item.price}
                imageUrl={itemData.item.imageUrl}
                onSelectedItem={
                    () => {
                        props.navigation.navigate(
                            'ProductDetails', 
                            {id: itemData.item.id}
                        )
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
            />
        );
    };
    return (
        <View style={styles.list}>
            <FlatList 
                data={props.listData}
                keyExtractor={(item, index) => item.id}
                renderItem={renderShopItem}
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