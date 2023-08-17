import { combineReducers } from "redux";
import {
   bookListReducer,
   bookDetailsReducer,
} from "./bookReducers";

export default combineReducers({
   bookList: bookListReducer,
   bookDetails: bookDetailsReducer,

});