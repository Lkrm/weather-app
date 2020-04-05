import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  path, pathOr, cond, T, equals, always, propOr, isNil, ifElse,
} from 'ramda';

import { celsiusIcon, sunIcon } from '../../assets/images';
import { getWeatherByDaysRequest } from '../../store/weather/actions';
import './style.css';

const getLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(ifElse(isNil, () => {
      alert('Ми не змогли визначити вашу геолокацію.');
    }, callback));
  } else {
    alert('Цей браузер не підтримує визначення Геолокації.');
  }
};

const getOnlyDate = (value) => value.slice(0, value.length - 3);

const getWeatherIcon = (name) => cond([
  [equals('Clear'), always(sunIcon)],
  [T, always(sunIcon)],
])(name);

const convertTemp = (val) => Math.round(val - 273.15);

const CurrentWeather = () => {
  const dispatch = useDispatch();
  const weathers = useSelector((({ weather }) => weather.weatherByDays));

  const onLoadCurrentWeather = useCallback(
    () => getLocation(({ coords: { latitude = '50.4546600', longitude = '30.5238000' } }) => {
      dispatch(getWeatherByDaysRequest({
        lat: latitude, lang: 'ua', lon: longitude, cnt: 16,
      }));
    }), [dispatch],
  );
  useEffect(() => {
    onLoadCurrentWeather();
  }, [onLoadCurrentWeather]);
  return (
    <div className="weather-by-days">
      {
          propOr([], 'list', weathers).map((item) => (
            <div className="weather-by-days__item">
              <time className="weather-by-days__date">
                {getOnlyDate(path(['dt_txt'], item))}
              </time>
              <div className="weather-by-days__deg">
                <img src={celsiusIcon} alt="" className="weather-by-days__deg-icon" />
                <div className="weather-by-days__deg-val">
                  <span>{convertTemp(pathOr(0, ['main', 'temp'], item))}</span>
                </div>
              </div>
              <div className="weather-by-days__sub-title">
                <img
                  src={getWeatherIcon(path(['weather', 0, 'main'], item))}
                  alt=""
                  className="current-weather__deg-icon"
                />
                {path(['weather', 0, 'description'], item)}
              </div>
            </div>
          ))
        }
    </div>
  );
};

export default CurrentWeather;
