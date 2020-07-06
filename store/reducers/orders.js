import { 
    TOGGLE_ORDER_DETAILS, 
    CREATE_ORDER 
} from '../actions/orders';

const initialState = {
    //expandOrder: false,
    orders: [],
    lastId: 0,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_ORDER_DETAILS:
            const existingIndex = state.orders.findIndex(order => order.id === action.orderId);
            const currentOrder = state.orders.find(order => order.id === action.orderId);

            const updatedOrderStatus = {
                id: currentOrder.id,
                expandOrder: action.status,
                sum: currentOrder.sum,
                content: currentOrder.content,
            }

            const updatedOrder = [...state.orders];
            updatedOrder.splice(existingIndex, 1, updatedOrderStatus);

            return { 
                ...state, 
                orders: updatedOrder,
            };
        case CREATE_ORDER:

            const order = {
                id: state.lastId + 1,
                expandOrder: false,
                sum: action.totalPrice,
                content: action.cartItems,
            }

            return { 
                ...state, 
                orders: state.orders.concat(order),
                lastId: state.lastId + 1,
            };
        default:
            return state;
    }
    
}

export default ordersReducer;