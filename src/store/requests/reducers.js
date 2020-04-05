import types from "./types";
import {handleActions} from "redux-actions";


export default handleActions({
    [types.SET_API_REQUEST_PENDING]: ({ pending, ...state }, { payload }) =>({ ...state,
        pending: { ...pending, ...payload } }),
}, {
    errors: {},
    pending: {},
});
