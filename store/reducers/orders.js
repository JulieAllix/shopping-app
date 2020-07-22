import { 
    TOGGLE_ORDER_DETAILS, 
    CREATE_ORDER 
} from '../actions/orders';

import Order from '../../models/order';

const initialState = {
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
            const newOrder = new Order(
                state.lastId + 1,
                false,
                action.cartItems,
                action.totalPrice,
                new Date()
              );
              return {
                ...state,
                orders: state.orders.concat(newOrder),
                lastId: state.lastId + 1
              };

        default:
            return state;
    }
    
}

export default ordersReducer;