import { GET_PRODUCT } from "../types";
const initialState = {
  product: {
    id: "",
    name: "",
    img: "",
    price: "",
    quantity: "",
    brand: {
      id: "",
      name: "",
    },
    color: {
      id: "",
      name: "",
    },
  },
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};
