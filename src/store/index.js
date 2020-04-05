import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import weather from './weather';
import requests from './requests';
import requestMiddleware from '../utils/helpers/requestMiddleware';

const store = combineReducers(
  {
    requests,
    weather,
  },
);

export default createStore(store, composeWithDevTools(applyMiddleware(requestMiddleware)));
