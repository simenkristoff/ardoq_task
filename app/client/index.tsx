import React from 'react';

import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/nb_NO';
import moment from 'moment';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './styles/styles.scss';

import App from './App';
import configureStore from './store/configureStore';

// Setup locale for moment;
const LOCALE = process.env.LOCALE ? process.env.LOCALE : 'no';
moment.locale(LOCALE);

const initialState = (window as any).initialReduxState;
const store = configureStore(initialState);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
