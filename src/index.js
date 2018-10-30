import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { CookiesProvider } from 'react-cookie';
import App from './containers/App';
import './styles/index.scss';
import Shop from './models/Shop';

const shop = Shop.create({});

ReactDOM.render(
  <Provider shop={shop}>
    <BrowserRouter>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
