import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Text,
    StyleSheet
} from 'react-native';

const ProductDetailsScreen = ({ route, navigation }) => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    const { id } = route.params;
    const productId = JSON.parse(JSON.stringify(id));
    const selectedProduct = availableProducts.find(product => product.id === productId);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedProduct.title
        });
    });

    return ( 
        <Text style={styles.screen}>ProductDetailsScreen !</Text>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default ProductDetailsScreen;