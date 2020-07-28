import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import { updateProduct, createProduct } from '../store/actions/products';

import Colors from '../constants/Colors';
import MyButton from '../components/MyButton';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditUserProductsScreen = props => {
    const prodId = useSelector(state => state.products.editProductId);
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    );
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
          title: editedProduct ? editedProduct.title : '',
          imageUrl: editedProduct ? editedProduct.imageUrl : '',
          description: editedProduct ? editedProduct.description : '',
          price: ''
        },
        inputValidities: {
          title: editedProduct ? true : false,
          imageUrl: editedProduct ? true : false,
          description: editedProduct ? true : false,
          price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
      });

      const submitHandler = () => {
        if (!formState.formIsValid) {
          Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
          ]);
          return;
        }
        if (editedProduct) {
          dispatch(
            updateProduct(
              prodId,
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl
            )
          );
        } else {
          dispatch(
            createProduct(
              formState.inputValues.title,
              formState.inputValues.description,
              formState.inputValues.imageUrl,
              +formState.inputValues.price
            )
          );
        }
        props.navigation.goBack();
      };

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        };
        if (inputIdentifier === 'price') {
            text = text.replace(',', '.');
        };
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: text,
            isValid: isValid,
            input: inputIdentifier
        });
    }

    return ( 
        <ScrollView>
            <View style={styles.inputsContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Title</Text>
                    <TextInput 
                        name="title"
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        value={formState.inputValues.title}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                    />
                    {!formState.inputValidities.title && <Text>Please enter a valid title!</Text>}
                </View>
                {editedProduct ? null : (
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Price</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'price')}
                        value={formState.inputValues.price}
                        keyboardType='decimal-pad'
                    />
                </View>
                )}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Description</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'description')}
                        value={formState.inputValues.description}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Image url</Text>
                    <TextInput 
                        style={styles.input} 
                        onChangeText={textChangeHandler.bind(this, 'imageUrl')}
                        value={formState.inputValues.imageUrl}
                    />
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <MyButton onPress={submitHandler}>Validate</MyButton>
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
    buttonContainer: {
        alignItems: 'center',
    }
});

export default EditUserProductsScreen;