import { createActions} from 'redux-actions';
import types from  './types';

export const {
   apiRequestSend, apiRequestError, apiRequestSuccess, setApiRequestPending,
} = createActions(
    {
}, types.API_REQUEST_SEND,
    types.API_REQUEST_ERROR,
    types.SET_API_REQUEST_PENDING,
    types.API_REQUEST_SUCCESS);
