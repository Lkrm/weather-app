import { createActions } from 'redux-actions';
import types from './types';

export const {
  getCurrentWeatherRequest,
  getWeatherByDaysRequest,
  setCurrentWeather,
  setWeatherByDays,
} = createActions(
  {
    [types.GET_CURRENT_WEATHER_REQUEST]: (params, meta) => ({
      async: true,
      actionName: 'getCurrentWeatherRequest',
      url: 'http://api.openweathermap.org/data/2.5/weather',
      method: 'GET',
      params,
      actions: {
        success: setCurrentWeather,
      },
      ...meta,
    }),
    [types.GET_WEATHER_BY_DAYS_REQUEST]: (params, meta) => ({
      async: true,
      actionName: 'getWeatherByDaysRequest',
      url: 'http://api.openweathermap.org/data/2.5/forecast',
      method: 'GET',
      params,
      actions: {
        success: setWeatherByDays,
      },
      ...meta,
    }),
  }, types.SET_CURRENT_WEATHER,
  types.SET_WEATHER_BY_DAYS,
);
