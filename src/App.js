import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './style.css';
import { CurrentWeather, WeatherByDays } from './components';

function App() {
  return (
    <Provider store={store}>
      <div className="page-wrapper">
        <CurrentWeather />
        <WeatherByDays />
      </div>
    </Provider>
  );
}

export default App;
