const createStore = (reducer, initialState) => {
  let state = initialState;
  let updater = () => {};

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    updater();
  };

  const subscribe = listener => {
    updater = listener;
  };

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

store.subscribe(() => {
  console.log('listening =>', store.getState());
});
store.dispatch('new state');
