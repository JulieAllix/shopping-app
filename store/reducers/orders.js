import { 
    CREATE_ORDER 
} from '../actions/orders';

import Order from '../../models/order';

const initialState = {
    orders: [],
    lastId: 0,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {

        case CREATE_ORDER:
            const newOrder = new Order(
                action.id,
                action.cartItems,
                action.totalPrice,
                action.date
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