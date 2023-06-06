const createStore = (reducer, initialState) => {
  let state = initialState;

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
  };

  const subscribe = () => {};

  return {
    getState,
    dispatch,
    subscribe
  };
};

const reducer = (state, action) => action;

const store = createStore(reducer, 'initial state');
// store.getState
// store.dispatch
// store.subscribe

store.dispatch('new state');
