import React from 'react';
import { useSelector } from 'react-redux';
import { 
    Text,
    StyleSheet,
    ScrollView,
    Image,
    View
} from 'react-native';

import MyButton from '../components/MyButton';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';

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
        <ScrollView style={styles.screen}>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.price}>{selectedProduct.price}€</Text>
                <DefaultText>{selectedProduct.description}</DefaultText>
                <MyButton>Add to cart</MyButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,   
    },
    image: {
        width: '100%',
        height: 200
    },
    infoContainer: {
        height: '70%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.accentColor,
    },
});

export default ProductDetailsScreen;