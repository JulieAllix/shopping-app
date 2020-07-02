import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import MyButton from '../components/MyButton';

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
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <Text style={styles.price}>{selectedProduct.price}€</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
            <MyButton>Add to cart</MyButton>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
});

export default ProductDetailsScreen;