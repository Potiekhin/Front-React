import {ADD_ONE, ADD_PRODUCT, DELETE_PRODUCT, SUBTRACT_ONE} from "../types";

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
                cart: state.cart.filter(product => product.product_id != action.payload)
            }
        case ADD_ONE:
            const index = state.cart.findIndex(product => product.id !== action.payload); //finding index of the item
            const newArray = [...state.cart]; //making a new array
            newArray[index].specifications.quantity += 1//changing value in the new array
            return {
                ...state, //copying the orignal state
                cart: newArray, //reassingning todos to new array
            }

        case SUBTRACT_ONE:
            const index2 = state.cart.findIndex(product => product.id !== action.payload); //finding index of the item
            const newArray2 = [...state.cart]; //making a new array
            newArray2[index2].specifications.quantity -= 1//changing value in the new array
            return {
                ...state, //copying the orignal state
                cart: newArray2, //reassingning todos to new array
            }
        default:
            return state;
    }
};
export default cartReducer