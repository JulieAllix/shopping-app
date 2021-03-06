import React, { useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import { setTitle, setPrice, setDescription, setImageUrl } from '../store/actions/products';

import Colors from '../constants/Colors';

const EditUserProductsScreen = props => {

    useReducer(formReducer, {
        inputValues: {
            title: '',
            imageUrl: '',
            description: '',
            price: ''
        }, 
        inputValidities: {
            title: ''
        }, 
        formIsValid: false
    });

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
    const priceStatus = useSelector(state => state.products.priceStatus);

    const [titleIsValid, setTitleIsValid] = useState(false);
    const titleChangeHandler = text => {
        if (text.trim().length === 0) {
            setTitleIsValid(false);
        } else {
            setTitleIsValid(true);
        }
        dispatch(setTitle(text));
    }

    return ( 
        <ScrollView>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        name="title"
                        style={styles.input} 
                        onChangeText={titleChangeHandler}
                        value={titleInput}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                    />
                    {!titleIsValid && <Text>Please enter a valid title !</Text>}
                </View>
                {priceStatus === true ?
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        name="price"
                        style={styles.input} 
                        onChangeText={priceInputHandler}
                        value={priceInput}
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                    />
                </View>
                :
                <View style={styles.inputContainer}>
                </View>
                }
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
                        onChangeText={imageUrlInputHandler}
                        value={imageUrlInput}
                    />
                </View>
            </View>
        </ScrollView>
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
        width: '100%'
    },
    label: {
        fontSize: 18,
        fontFamily: 'noto-b',
        color: Colors.primaryColor
    },
    input: {
        borderColor: Colors.primaryColor, 
        borderBottomWidth: 1, 
        padding: 10,
        marginVertical: 20,
    },
});

export default EditUserProductsScreen;