import { 
    TOGGLE_ORDER_DETAILS, 
    CREATE_ORDER 
} from '../actions/orders';

const initialState = {
    expandOrder: false,
    orders: [],
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ORDER_DETAILS:
            return { 
                ...state, 
                expandOrder: action.status,
            };
        case CREATE_ORDER:
            const cartItems = action.cartItems;
            const qtiesData = action.qtiesData;
            const order = cartItems.map(cartItem => {
                return {
                id: cartItem.id,
                item: cartItem.item,
                price: cartItem.price,
                qty: qtiesData.find(product => product.id === cartItem.id).qty,
                }
            });
            console.log('order');
            console.log(order);

            return { 
                ...state, 
                orders: state.orders.concat(order),
            };
        default:
            return state;
    }
    
}

export default ordersReducer;