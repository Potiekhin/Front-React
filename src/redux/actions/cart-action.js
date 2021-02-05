import {ADD_ONE, ADD_PRODUCT, ADD_PRODUCT_TO_DB, DELETE_PRODUCT, GET_PRODUCT_FROM_DB, SUBTRACT_ONE} from "../types";
import axios from "axios";

export const addToCartAction = (product) => {
    return (dispatch) => {
        dispatch({type: ADD_PRODUCT, payload: {quantity: 1, id: product.id, product: product.specifications}})
    }
}

export const getCartFromDBAction = (url) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(url)
            console.log(response)
            if (response.data.msg === "user not found") {
                if (JSON.parse(localStorage.getItem('cart')).length > 0) {
                    const response = await axios.post(url, JSON.parse(localStorage.getItem('cart')))
                    if (response.status === 201) {
                        const getResponse = await axios.get(url)
                        dispatch({type: GET_PRODUCT_FROM_DB, payload: getResponse.data})
                    }
                }

            } else {
                dispatch({type: GET_PRODUCT_FROM_DB, payload: response.data})
            }

        } catch (error) {
            console.log(error.status)
        }
    }
}

export const addToCartDBAction = (product, url) => {
    return async (dispatch) => {
        try {
            product.quantity = 1
            const response = await axios.post(url, product);
            if (response.status === 201) {
                const getResponse = await axios.get(url)

                dispatch({type: GET_PRODUCT_FROM_DB, payload: getResponse.data})
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const deleteFromCartDBAction = (delUrl, getUrl) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(delUrl);
            if (response.status === 200) {
                const getResponse = await axios.get(getUrl)
                if (getResponse.data.msg === "user not found") {
                    dispatch({type: GET_PRODUCT_FROM_DB, payload: []})
                } else {

                    dispatch({type: GET_PRODUCT_FROM_DB, payload: getResponse.data})
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const editOneDBAction = (delUrl, getUrl, quantity) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(delUrl, quantity);
            if (response.status === 200) {
                const getResponse = await axios.get(getUrl)
                if (getResponse.data.msg === "user not found") {
                    dispatch({type: GET_PRODUCT_FROM_DB, payload: []})
                } else {

                    dispatch({type: GET_PRODUCT_FROM_DB, payload: getResponse.data})
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
export const deleteFromCartAction = (product) => {
    return (dispatch) => {
        dispatch({type: DELETE_PRODUCT, payload: product.id})
    }
}
export const addOneAction = (product) => {
    return (dispatch) => {
        dispatch({type: ADD_ONE, payload: product.id})
    }
}
export const subtractOneAction = (product) => {
    return (dispatch) => {
        dispatch({type: SUBTRACT_ONE, payload: product.id})
    }
}
