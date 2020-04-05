import axios from 'axios';
import { apiRequestError, apiRequestSend, setApiRequestPending } from '../../store/requests/actions';

const requestBuilder = async ({
  url, method, params, callbacks = {},
  actionName, dispatch, actions = {},
}) => {
  try {
    const { data } = await axios({
      method: method.toLowerCase(),
      url,
      [method === 'GET' ? 'params' : 'data']: { ...params, appid: '0534bcc694333618cbcd509b5d7ef813' },
    });
    if (callbacks.success) callbacks.success(data);
    if (actions.success) dispatch(actions.success(data));
  } catch (e) {
    if (callbacks.success) callbacks.success(e);
    if (actions.error) dispatch(actions.error(e));
    dispatch(apiRequestError({ ...e }));
  } finally {
    dispatch(setApiRequestPending({ [actionName]: false }));
  }
};

const requestMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  const { payload: { async, actionName, ...data } } = action;
  if (async) {
    dispatch(apiRequestSend(action));
    dispatch(setApiRequestPending({ [actionName]: true }));
    requestBuilder({ ...data, actionName, dispatch });
  } else {
    next(action);
  }
};

export default requestMiddleware;
