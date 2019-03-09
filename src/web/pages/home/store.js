

import { createStore } from 'redux';

const state = {}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": return {};
    default: return {}
  }
}

const store = createStore(reducer);
export default store;