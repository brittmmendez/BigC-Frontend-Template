import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import './static/index.css';
import Shop from './models/Shop';

const shop = (window.group = Shop.create({}));

ReactDOM.render(
  <Provider shop={shop}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
