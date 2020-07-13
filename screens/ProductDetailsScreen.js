import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    Text,
    StyleSheet,
    ScrollView,
    Image,
    View
} from 'react-native';

import { addToCart } from '../store/actions/products';

import MyButton from '../components/MyButton';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';

const ProductDetailsScreen = ({ route, navigation }) => {
    const availableProducts = useSelector(state => state.products.availableProducts);
    const productId = JSON.parse(JSON.stringify(route.params.id));
    const selectedProduct = availableProducts.find(product => product.id === productId);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: selectedProduct.title
        });
    });

    const dispatch = useDispatch();
    const addToCartHandler = (productId) => {
        dispatch(addToCart(productId));
    };

    return ( 
        <ScrollView style={styles.screen}>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.price}>{selectedProduct.price}€</Text>
                <DefaultText>{selectedProduct.description}</DefaultText>
                <View style={styles.buttonContainer}>
                    <MyButton
                        onPress={
                        () => {
                            addToCartHandler(productId);
                            navigation.navigate(
                                'Cart'
                            );
                        }
                    }
                    >
                        Add to cart
                    </MyButton>
                </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10,
        padding: 15,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.accentColor,
        marginTop: 20,
        marginBottom: 50,
    },
    buttonContainer: {
        marginTop: 50,
    }
});

export default ProductDetailsScreen;