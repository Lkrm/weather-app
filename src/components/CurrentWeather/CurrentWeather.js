import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  prop, path, pathOr, cond, T, equals, always,
} from 'ramda';

import { celsiusIcon, sunIcon } from '../../assets/images';
import { getCurrentWeatherRequest } from '../../store/weather/actions';
import './style.css';

const getLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(callback);
  } else {
    alert('This browser doesn`t support geolocation');
  }
};

const getWeatherIcon = (name) => cond([
  [equals('Clear'), always(sunIcon)],
  [T, always(sunIcon)],
])(name);

const convertTemp = (val) => (val - 273.15);

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const currentWeather = useSelector((({ weather }) => weather.currentWeather));

  const onLoadCurrentWeather = useCallback(
    () => getLocation(({ coords: { latitude, longitude } }) => {
      dispatch(getCurrentWeatherRequest({
        lat: latitude, lang: 'ua', lon: longitude,
      }));
    }), [dispatch],
  );
  useEffect(() => {
    onLoadCurrentWeather();
  }, [onLoadCurrentWeather]);
  return (

    <div className="current-weather">
      <h1 className="current-weather__title">
        {prop('name', currentWeather)}
      </h1>
      <div className="current-weather__deg">
        <img src={celsiusIcon} alt="" className="current-weather__deg-icon" />
        <div className="current-weather__deg-val">
          <img
            src={getWeatherIcon(path(['weather', 0, 'main'], currentWeather))}
            alt=""
            className="current-weather__deg-icon"
          />
          <span>{convertTemp(pathOr(0, ['main', 'temp'], currentWeather))}</span>
        </div>
      </div>
      <b className="current-weather__sub-title">{path(['weather', 0, 'description'], currentWeather)}</b>
      <ul className="current-weather__list">
        <li>
          <i>Швидкість вітру:</i>
          {' '}
          <b>{pathOr(0, ['wind', 'speed'], currentWeather)}</b>
        </li>
        <li>
          <i>Хмарність:</i>
          {' '}
          <b>{pathOr(0, ['cloud', 'all'], currentWeather)}</b>
        </li>
        <li>
          <i>Вологість:</i>
          {' '}
          <b>{path(['main', 'humidity'], currentWeather)}</b>
        </li>
      </ul>
    </div>
  );
};

export default CurrentWeather;
