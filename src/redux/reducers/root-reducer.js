import { combineReducers } from "redux";
import {productReducer} from "./product-reducer";
import cartReducer from "./cart-reducer";

export const rootReducer = combineReducers({productReducer, cartReducer});
