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
    //const product = state.availableProducts.find(product => product.id === action.productId);
    
    switch (action.type) {
        case ADD_TO_CART:
            const productToAdd = state.availableProducts.find(product => product.id === action.productId);
            const productPrice = productToAdd.price;
            const newTotalPrice = state.totalPrice + productPrice;
            
            /*
            If the product is already in the cart, I update the quantity and the total price only
            */
            if (existingIndex >= 0) {
                const productToUpdate = state.productsInCart.find(product => product.id === action.productId);

                const formerQty = productToUpdate.qty;

                const updatedProduct = {
                    id: productToUpdate.id,
                    title: productToUpdate.title,
                    price: productToUpdate.price,
                    qty: formerQty + 1,
                };

                const updatedProductInCart = [...state.productsInCart];
                updatedProductInCart.splice(existingIndex, 1, updatedProduct);
                
                return { 
                    ...state, 
                    productsInCart: updatedProductInCart,
                    totalPrice: newTotalPrice,
                };
            /*
            If the product is not in the cart, I update the list of products in cart, the quantity and the total price
            */
            } else {
                const newProduct = {
                    id: productToAdd.id,
                    title: productToAdd.title,
                    price: productToAdd.price,
                    qty: 1,
                };

                return { 
                    ...state, 
                    productsInCart: state.productsInCart.concat(newProduct),
                    totalPrice: newTotalPrice,
                };
            }

        case REMOVE_FROM_CART:
            const productToRemove = state.productsInCart.find(product => product.id === action.productId);

            const formerQty = productToRemove.qty;
            const decreasedTotalPrice = state.totalPrice - productToRemove.price;

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

                const updatedProduct = {
                    id: productToRemove.id,
                    title: productToRemove.title,
                    price: productToRemove.price,
                    qty: formerQty - 1,
                };

                const updatedProductInCart = [...state.productsInCart];
                updatedProductInCart.splice(existingIndex, 1, updatedProduct);

                return { 
                    ...state, 
                    productsInCart: updatedProductInCart,
                    totalPrice: decreasedTotalPrice,
                };
            }

        default:
            return state;
    }
}

export default productsReducer;