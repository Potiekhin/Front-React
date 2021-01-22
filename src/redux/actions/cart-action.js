
import {ADD_PRODUCT} from "../types";
export const addToCartAction = (product) =>{
    return (dispatch)=>{
        let newCart = JSON.parse(localStorage.getItem('cart'))
        newCart.push(product)
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch({type: ADD_PRODUCT, payload: product})
    }
}

