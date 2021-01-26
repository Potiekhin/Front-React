
import {ADD_PRODUCT, DELETE_PRODUCT} from "../types";
export const addToCartAction = (product) =>{
    return (dispatch)=>{
        let newCart = JSON.parse(localStorage.getItem('cart'))
        newCart.push(product)
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch({type: ADD_PRODUCT, payload: product})
    }
}
export const deleteFromCartAction = (product) => {
    console.log(product.product_id)
    return (dispatch)=>{
        dispatch({type: DELETE_PRODUCT, payload: product.product_id})
    }
}

