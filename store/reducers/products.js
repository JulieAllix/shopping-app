import PRODUCTS from '../../data/dummy-data';
import { ADD_TO_CART } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    productsInCart: [],
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const product = state.availableProducts.find(product => product.id === action.productId);
            return { ...state, productsInCart: state.productsInCart.concat(product) };
        default:
            return state;
    }
}

export default productsReducer;