import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { ToastProvider } from 'react-toast-notifications';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

const originalWarn = console.warn;

console.warn = (msg) => {
  const warningsParaEsconder = [
    'Each child in a list should have a unique "key" prop',
    'Failed prop type',
    'Unknown DOM property `class`',
    'Invalid DOM property `for`',
    "Can't perform a React state update on an unmounted component",
    'Encountered two children with the same key'
  ];

  if (!warningsParaEsconder.some((warning) => msg.includes(warning))) {
    originalWarn(msg);
  }
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <ConfigProvider>
      <ToastProvider placement="bottom-right">
        <App />
      </ToastProvider>
    </ConfigProvider>
  </Provider>
);

reportWebVitals();
