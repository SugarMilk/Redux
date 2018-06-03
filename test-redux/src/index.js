import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import reducers from './reducers'
import ReduxApp from './ReduxApp';

const store = createStore(reducers)

ReactDOM.render(
  <Provider store={store}>
    <ReduxApp />
  </Provider>, document.getElementById('root'))

registerServiceWorker();
