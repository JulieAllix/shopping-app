export const CREATE_ORDER = 'CREATE_ORDER';

export const createOrder = (cartItems, totalPrice) => {
    return async dispatch => {
        const date = new Date();
        const response = await fetch('https://shopping-app-a7aea.firebaseio.com/orders/u1.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalPrice,
                date: date.toISOString()
            })
        });
    
        if (!response.ok) {
            throw new Error('Something went wrong!');
        }

        const resData = await response.json();
    
        dispatch({
            type: CREATE_ORDER, 
            cartItems: cartItems,
            totalPrice: totalPrice,
            id: resData.name,
            date: date
        });
    };
};