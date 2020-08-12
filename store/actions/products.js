import Product from "../../models/product";

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const EMPTY_CART = 'EMPTY_CART';
export const SET_PRODUCT_INFO = 'SET_PRODUCT_INFO';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    // any async code you want !
    const response = await fetch('https://shopping-app-a7aea.firebaseio.com/products.json');

    const resData = await response.json();
    const loadedProducts = [];

    for (const key in resData) {
      loadedProducts.push(new Product(
        key, 
        'u1', 
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price,
        1,
        )
      );
    };

    dispatch({type: SET_PRODUCTS, products: loadedProducts });
  };
};

export const addToCart = (id) => {
    return { 
        type: ADD_TO_CART, 
        productId: id 
    };
};

export const removeFromCart = (id) => {
    return { 
        type: REMOVE_FROM_CART, 
        productId: id 
    };
};

export const emptyCart = () => {
    return { 
        type: EMPTY_CART, 
    };
};

export const setProductInfo = (title, description, imageUrl, bool, productId) => {
    return { 
        type: SET_PRODUCT_INFO, 
        title,
        description, 
        imageUrl,
        status: bool,
        productId
    };
};

export const deleteProduct = (id) => {
    return { 
        type: DELETE_PRODUCT, 
        productId: id,
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async dispatch => {
      // any async code you want !
      const response = await fetch('https://shopping-app-a7aea.firebaseio.com/products.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title, 
          description, 
          imageUrl, 
          price
        })
      });

      const resData = await response.json();

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title, 
          description, 
          imageUrl, 
          price
        }
      });
    };
    
    return {
      type: CREATE_PRODUCT,
      productData: {
        title,
        description,
        imageUrl,
        price
      }
    };
  };

export const updateProduct = (id, title, description, imageUrl) => {
    return {
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      }
    };
  };

