const createStore = (reducer, initialState) => {
  let state = initialState;

  const getState = () => state;

  const dispatch = () => {};

  const subscribe = () => {};

  return {
    getState,
    dispatch,
    subscribe
  };
};

const reducer = () => {};

const store = createStore(reducer, 'initial state');
// store.getState
// store.dispatch
// store.subscribe
