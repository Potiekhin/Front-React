import {ADD_PRODUCT, DELETE_PRODUCT} from "../types";

if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]))
}
const initialState = {
    cart: JSON.parse(localStorage.getItem('cart'))
}
const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                cart: state.cart.filter(product=>product.product_id != action.payload )
            }
        default:
            return state;
    }
};
export default cartReducer