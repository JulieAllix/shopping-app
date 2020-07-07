import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import { setTitle, setPrice, setDescription, setImageUrl } from '../store/actions/products';

import Colors from '../constants/Colors';

const EditUserProductsScreen = props => {
    const dispatch = useDispatch();

    const titleInputHandler = (text) => {
        dispatch(setTitle(text));
    };
    const priceInputHandler = (text) => {
        dispatch(setPrice(text));
    };
    const descriptionInputHandler = (text) => {
        dispatch(setDescription(text));
    };
    const imageUrlInputHandler = (text) => {
        dispatch(setImageUrl(text));
    };
    const titleInput = useSelector(state => state.products.title);
    const priceInput = useSelector(state => state.products.price);
    const descriptionInput = useSelector(state => state.products.description);
    const imageUrlInput = useSelector(state => state.products.imageUrl);

    return ( 
        <View style={styles.inputsContainer}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    name="title"
                    style={styles.input} 
                    onChangeText={titleInputHandler}
                    value={titleInput}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Price</Text>
                <TextInput 
                    name="price"
                    style={styles.input} 
                    onChangeText={priceInputHandler}
                    value={priceInput}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput 
                    name="description"
                    style={styles.input} 
                    onChangeText={descriptionInputHandler}
                    value={descriptionInput}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Image url</Text>
                <TextInput 
                    name="imageUrl"
                    style={styles.input} 
                    onChangeText={setImageUrl}
                    value={imageUrlInputHandler}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputsContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        marginTop: 15
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%'
    },
    label: {
        width: '35%',
        fontSize: 18,
        fontFamily: 'noto',
        color: Colors.primaryColor
    },
    input: {
        width: '63%', 
        borderColor: Colors.primaryColor, 
        borderBottomWidth: 1, 
        padding: 10,
        marginVertical: 20,
    },
});

export default EditUserProductsScreen;