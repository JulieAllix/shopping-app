import PRODUCTS from '../../data/dummy-data';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    productsInCart: [],
    qtiesInCart: [],
};

const productsReducer = (state = initialState, action) => {
    const existingIndex = state.productsInCart.findIndex(product => product.id === action.productId);

    switch (action.type) {
        case ADD_TO_CART:
            const product = state.availableProducts.find(product => product.id === action.productId);
            let newQtiesInCart = [];
            //console.log(existingIndex);
            if (existingIndex >= 0) {
                const product = state.qtiesInCart.find(product => product.id === action.productId);
                const formerQty = product.qty;
                console.log('formerQty');
                console.log(formerQty);
                newQtiesInCart = {
                    id: action.productId,
                    qty: formerQty + 1,
                };
                    console.log(state.qtiesInCart);
                const updatedQties = [...state.qtiesInCart];
                updatedQties.splice(existingIndex, 1, newQtiesInCart);
                
                return { 
                    ...state, 
                    qtiesInCart: updatedQties
                };

            } else {
                newQtiesInCart = {
                    id: action.productId,
                    qty: 1,
                };

                return { 
                    ...state, 
                    productsInCart: state.productsInCart.concat(product),
                    qtiesInCart: state.qtiesInCart.concat(newQtiesInCart)
                };
            }

        case REMOVE_FROM_CART:
            const updatedCartItems = [...state.productsInCart];
            
            updatedCartItems.splice(existingIndex, 1);
            return { ...state, productsInCart: updatedCartItems };

        default:
            return state;
    }
}

export default productsReducer;