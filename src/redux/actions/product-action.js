import axios from "axios";
import { GET_PRODUCT } from "../types";

const baseUrl = "http://127.0.0.1:8000";

export const productAction = (url) => {
  return async (dispatch) => {
    try {
      const response = await axios(baseUrl + url);
      dispatch({ type: GET_PRODUCT, payload: response.data[0] });
    } catch (error) {
      console.log(error);
    }
  };
};
