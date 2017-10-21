import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {useStrict} from 'mobx';
import {Provider} from 'mobx-react';

import registerServiceWorker from './registerServiceWorker';
import * as stores from './stores';

useStrict(true);

ReactDOM.render(
  <Provider {...stores}>
    <App/>
  </Provider>
  ,
  document.getElementById('root'),
);
registerServiceWorker();