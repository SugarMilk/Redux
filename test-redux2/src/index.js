import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import reducers from './reducers';
import actions from './actions';

const store = createStore(reducers, {list: []})
const ReduxApp = connect(state=>state, actions)(App)

ReactDOM.render(
  <Provider store={store}>
    <ReduxApp />
  </Provider>
  , document.getElementById('root'))

registerServiceWorker();
