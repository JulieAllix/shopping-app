import PRODUCTS from '../../data/dummy-data';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    productsInCart: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const product = state.availableProducts.find(product => product.id === action.productId);
            return { ...state, productsInCart: state.productsInCart.concat(product) };
        case REMOVE_FROM_CART:
            const existingIndex = state.productsInCart.findIndex(product => product.id === action.productId);
            const updatedCartItems = [...state.productsInCart];
            
            updatedCartItems.splice(existingIndex, 1);
            return { ...state, productsInCart: updatedCartItems };

        default:
            return state;
    }
}

export default productsReducer;