import PRODUCTS from '../../data/dummy-data';
import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    EMPTY_CART,
    SET_PRODUCT_INFO,
    DELETE_PRODUCT,
    CREATE_PRODUCT,
    UPDATE_PRODUCT
} from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
    productsInCart: [],
    qtiesInCart: [],
    totalPrice: 0,
    latestId: '6',
    editProductId: '',
};

const productsReducer = (state = initialState, action) => {
    
    const existingIndex = state.productsInCart.findIndex(product => product.id === action.productId);
    const formerTotalPrice = (Math.round((parseFloat(state.totalPrice))*100))/100;

    switch (action.type) {
        case ADD_TO_CART:
            const productToAdd = state.availableProducts.find(product => product.id === action.productId);
            const productPrice = productToAdd.price;
            
            const newTotalPrice = formerTotalPrice + productPrice;
            
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
            const decreasedTotalPrice = formerTotalPrice - productToRemove.price;

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

        case EMPTY_CART:
            return initialState;

        case SET_PRODUCT_INFO:
            return {
                ...state,
                title: action.title,
                description: action.description,
                imageUrl: action.imageUrl,
                editProductId: action.productId,
            };

        case DELETE_PRODUCT:
            if (!state.productsInCart.find(product => product.id === action.productId)) {
                return {
                    ...state, 
                    userProducts: state.userProducts.filter(
                    product => product.id !== action.productId
                    ),
                    availableProducts: state.availableProducts.filter(
                    product => product.id !== action.productId
                    )
                }
            } else {
                const removedProduct = state.productsInCart.find(product => product.id === action.productId);
                const itemTotalPrice = removedProduct.qty * removedProduct.price;

                return { 
                    ...state, 
                    userProducts: state.userProducts.filter(
                    product => product.id !== action.productId
                    ),
                    availableProducts: state.availableProducts.filter(
                    product => product.id !== action.productId
                    ),
                    productsInCart: state.productsInCart.filter(
                    product => product.id !== action.productId
                    ),
                    totalPrice: state.totalPrice - itemTotalPrice
                };
            };
            
        case CREATE_PRODUCT:
        const newProduct = {
            id: 'p' + state.latestId + 1,
            ownerId: 'u1',
            title: action.productData.title,
            imageUrl: action.productData.imageUrl,
            description: action.productData.description,
            price: action.productData.price,
            qty: 1,
        };

        return {
            ...state,
            availableProducts: state.availableProducts.concat(newProduct),
            userProducts: state.userProducts.concat(newProduct),
            
        };

        case UPDATE_PRODUCT:

        const productIndex = state.userProducts.findIndex(
            prod => prod.id === action.pid
        );

        const updatedProduct = {
            id: state.editProductId,
            ownerId: 'u1',
            title: action.productData.title,
            imageUrl: action.productData.imageUrl,
            description: action.productData.description,
            price: state.userProducts[productIndex].price,
            qty: 1,
        };

        const updatedUserProducts = [...state.userProducts];
        updatedUserProducts[productIndex] = updatedProduct;
        const availableProductIndex = state.availableProducts.findIndex(
        prod => prod.id === action.pid
        );
        const updatedAvailableProducts = [...state.availableProducts];
        updatedAvailableProducts[availableProductIndex] = updatedProduct;
        return {
            ...state,
            availableProducts: updatedAvailableProducts,
            userProducts: updatedUserProducts
        };

        default:
            return state;
    }
}

export default productsReducer;
