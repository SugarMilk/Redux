const Store = require('./Store');

exports.createStore = function createStore(reducers, initialState) {
  const store = new Store(initialState)
  store.setReducers(reducers)
  return store;
}

exports.useMiddleware = function useMiddleware(store, middlewares) {
  middlewares.reverse()
  middlewares.forEach(middleware => {
    // [ORIGINAL] middleware(store)

    // 需要执行两次才能得到最终重写后的 dispatch 方法
    let dispatch = store.dispatch
    store.dispatch = middleware(store)(dispatch.bind(store))
  })
  return store
}
