import PRODUCTS from '../../data/dummy-data';
import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    productsInCart: [],
    qtiesInCart: [],
    totalPrice: 0,
};

const productsReducer = (state = initialState, action) => {
    
    const existingIndex = state.productsInCart.findIndex(product => product.id === action.productId);
    const product = state.availableProducts.find(product => product.id === action.productId);
    
    switch (action.type) {
        case ADD_TO_CART:
            
            const productPrice = product.price;
            const newTotalPrice = state.totalPrice + productPrice;
            let newQtiesInCart = [];
            /*
            If the product is already in the cart, I update the quantity and the total price only
            */
            if (existingIndex >= 0) {
                const product = state.qtiesInCart.find(product => product.id === action.productId);
                const formerQty = product.qty;

                newQtiesInCart = {
                    id: action.productId,
                    qty: formerQty + 1,
                };

                const updatedQties = [...state.qtiesInCart];
                updatedQties.splice(existingIndex, 1, newQtiesInCart);
                
                return { 
                    ...state, 
                    qtiesInCart: updatedQties,
                    totalPrice: newTotalPrice,
                };
            /*
            If the product is not in the cart, I update the list of products in cart, the quantity and the total price
            */
            } else {
                newQtiesInCart = {
                    id: action.productId,
                    qty: 1,
                };

                return { 
                    ...state, 
                    productsInCart: state.productsInCart.concat(product),
                    qtiesInCart: state.qtiesInCart.concat(newQtiesInCart),
                    totalPrice: newTotalPrice,
                };
            }

        case REMOVE_FROM_CART:
            const qtyInCart = state.qtiesInCart.find(product => product.id === action.productId);
            const formerQty = qtyInCart.qty;

            const removedProductPrice = product.price;
            const decreasedTotalPrice = state.totalPrice - removedProductPrice;

            /*
            If the product was in the cart in only one quantity, I remove the product from the cart and update the total price 
            */
            if (formerQty === 1) {

                const updatedCartItems = [...state.productsInCart];
                updatedCartItems.splice(existingIndex, 1);
    
                return { 
                    ...state, 
                    productsInCart: updatedCartItems,
                    totalPrice: decreasedTotalPrice,
                };
            /*
            If the product was in the cart in more than one quantity, I keep the product in the cart but I update the quantity and the total price 
            */
            } else {

                newQtiesInCart = {
                    id: action.productId,
                    qty: formerQty - 1,
                };

                const updatedQties = [...state.qtiesInCart];
                updatedQties.splice(existingIndex, 1, newQtiesInCart);
                
                return { 
                    ...state, 
                    qtiesInCart: updatedQties,
                    totalPrice: decreasedTotalPrice,
                };
            }

        default:
            return state;
    }
}

export default productsReducer;