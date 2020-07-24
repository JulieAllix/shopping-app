import PRODUCTS from '../../data/dummy-data';
import { 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    EMPTY_CART,
    SET_PRODUCT_INFO,
    SET_TITLE,
    SET_PRICE,
    SET_DESCRIPTION,
    SET_IMAGE,
    CREATE_OBJECT,
    SET_PRICE_STATUS,
    ADD_PRODUCT,
    SET_EDIT_MODE,
    EDIT_PRODUCT,
    DELETE_PRODUCT,
} from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
    productsInCart: [],
    qtiesInCart: [],
    totalPrice: 0,
    title: '',
    price: '',
    description: '',
    imageUrl: '',
    latestId: '6',
    priceStatus: true,
    editMode: false,
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
                priceStatus: action.status,
                editMode: true,
                editProductId: action.productId,
            };

        case SET_TITLE:
            return {
                ...state,
                title: action.value,
            };

        case SET_PRICE:
            return {
                ...state,
                price: action.value,
            };

        case SET_DESCRIPTION:
            return {
                ...state,
                description: action.value,
            };

        case SET_IMAGE:
            return {
                ...state,
                imageUrl: action.value,
            };

        case CREATE_OBJECT:
            const newObject = {
                id: 'p' + state.latestId + 1,
                ownerId: 'u1',
                title: state.title,
                imageUrl: state.imageUrl,
                description: state.description,
                price: parseInt(state.price),
                qty: 1,
            };

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newObject),
                title: '',
                price: '',
                description: '',
                imageUrl: '',
                latestId: state.latestId + 1
            };

        case SET_PRICE_STATUS:
            return {
                ...state,
                priceStatus: action.status
            };

        case ADD_PRODUCT:
            return {
                ...state,
                title: '',
                description: '',
                imageUrl: '',
                priceStatus: true,
                editMode: false,
                editProductId: '',
            };

        case SET_EDIT_MODE:
            return {
                ...state,
                editMode: true,
                editProductId: action.productId,
            };

        case EDIT_PRODUCT:
            const productToEdit = state.availableProducts.find(product => product.id === state.editProductId);
            const productToEditIndex = state.availableProducts.findIndex(product => product.id === state.editProductId);

            const updatedProduct = {
                id: state.editProductId,
                ownerId: productToEdit.ownerId,
                title: state.title,
                imageUrl: state.imageUrl,
                description: state.description,
                price: productToEdit.price,
                qty: 1,
            };

            const updatedProductInCart = [...state.availableProducts];
            updatedProductInCart.splice(productToEditIndex, 1, updatedProduct);

            return {
                ...state,
                availableProducts: updatedProductInCart,
                title: '',
                price: '',
                description: '',
                imageUrl: '',
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
        
        default:
            return state;
    }
}

export default productsReducer;
