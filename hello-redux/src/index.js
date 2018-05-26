import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore} from 'redux';
import reducer from './reducers/counter';

// 创建一个以reducer为规则的状态容器store
const store = createStore(reducer);

console.log(store);
/*
dispatch: ƒ dispatch(action)
getState: ƒ getState()
replaceReducer: ƒ replaceReducer(nextReducer)
subscribe: ƒ subscribe(listener)
Symbol(observable): ƒ observable()
*/

const render = function(){
  const component = (<App
    onIncrease={function(){
      // 当onIncrease事件被触发时，也触发store的相关方法以改变state
      store.dispatch({
        type: "INCREASE"
      });
    }}
    onDecrease={function(){
      store.dispatch({
        type: "DECREASE"
      });
    }}
    // 获取store当前的state值，传递给子组件
    value={store.getState()}
  />);
  const element = document.getElementById('root');
  ReactDOM.render(component, element);
}

render();

// 添加订阅者，行为触发时，
// 重新调用该方法（重新渲染）
store.subscribe(render);


registerServiceWorker();
