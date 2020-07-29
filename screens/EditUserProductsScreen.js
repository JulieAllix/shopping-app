import React, { useReducer, useCallback } from 'react';
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
import Input from '../components/Input';

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

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    return ( 
        <ScrollView>
            <View style={styles.inputsContainer}>
                <Input 
                  id='title'
                  label='Title'
                  errorText='Please enter a valid title !'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedProduct ? editedProduct.title : ''}
                  initiallyValid={!!editedProduct}
                  required
                />
                {editedProduct ? null : (
                  <Input 
                    id='price'
                    label='Price'
                    errorText='Please enter a valid price !'
                    keyboardType='decimal-pad'
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    required
                    min={0.01}
                  />
                )}
                <Input 
                  id='description'
                  label='Description'
                  errorText='Please enter a valid description !'
                  keyboardType='default'
                  autoCapitalize='sentences'
                  autoCorrect
                  multiline
                  numberOfLines={3}
                  onInputChange={inputChangeHandler}
                  initialValue={editedProduct ? editedProduct.description : ''}
                  initiallyValid={!!editedProduct}
                  required
                  minLength={5}
                />
                <Input 
                  id='imageUrl'
                  label='Image url'
                  errorText='Please enter a valid image url !'
                  keyboardType='default'
                  returnKeyType='next'
                  onInputChange={inputChangeHandler}
                  initialValue={editedProduct ? editedProduct.imageUrl : ''}
                  initiallyValid={!!editedProduct}
                  required
                />
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

    buttonContainer: {
        alignItems: 'center',
    }
});

export default EditUserProductsScreen;