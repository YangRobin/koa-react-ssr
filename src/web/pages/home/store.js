

import { createStore } from 'redux';



const reducer = (state = {
  count:1,
  mediaType:'article',
  filters: {
    name: "robin"
  }
}, action) => {
  switch (action.type) {
    case "ADD": return {...state ,count:state.count+=1}
    default: return state
  }
}

const store = createStore(reducer);
export default store;