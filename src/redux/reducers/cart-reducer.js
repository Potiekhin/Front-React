import {ADD_PRODUCT} from "../types";

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart'))
}
const cartReducer = (state = initialState, action) => {
    console.log(state)
    switch (action.type) {
        case ADD_PRODUCT:
            return {
                ...state,
                cart: [...state.cart, action.payload]
            };
        default:
            return state;
    }
};
export default cartReducer