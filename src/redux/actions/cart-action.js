
import {ADD_ONE, ADD_PRODUCT, DELETE_PRODUCT, SUBTRACT_ONE} from "../types";
export const addToCartAction = (product) =>{
    return (dispatch)=>{
        let newCart = JSON.parse(localStorage.getItem('cart'))
        product.specifications.quantity = 1
        newCart.push(product)
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch({type: ADD_PRODUCT, payload: product})
    }
}
export const deleteFromCartAction = (product) => {
    return (dispatch)=>{
        dispatch({type: DELETE_PRODUCT, payload: product.product_id})
    }
}
export const addOneAction = (product) =>{
    return(dispatch)=>{
        dispatch({type: ADD_ONE, payload: product.product_id})
    }
}
export const subtractOneAction = (product) =>{
    return(dispatch)=>{
        dispatch({type: SUBTRACT_ONE, payload: product.product_id})
    }
}
