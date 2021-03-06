import React, { 
  useState, 
  useReducer, 
  useCallback, 
  useEffect 
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
    View,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    ActivityIndicator
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
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

      useEffect(() => {
        if (error) {
          Alert.alert('An error occurred !', error, [{text: 'Okay'}]);
        }
      }, [error]);

      const submitHandler = useCallback(async() => {
        if (!formState.formIsValid) {
          Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
          ]);
          return;
        }
        setError(null);
        setIsLoading(true);
        try {
          if (editedProduct) {
            await dispatch(
              updateProduct(
                prodId,
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl
              )
            );
          } else {
            await dispatch(
              createProduct(
                formState.inputValues.title,
                formState.inputValues.description,
                formState.inputValues.imageUrl,
                +formState.inputValues.price
              )
            );
          }
          props.navigation.goBack();
        } catch (err) {
          setError(err.message);
        };
        
        setIsLoading(false);
        
      });

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator 
            size='large' 
            color={Colors.primaryColor}
            />
        </View>
      )
    }

    return ( 
      <KeyboardAvoidingView 
        style= {{ flex: 1 }} 
        behavior="padding" 
        keyboardVerticalOffset={70}
      >
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
      </KeyboardAvoidingView>
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
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    }
});

export default EditUserProductsScreen;