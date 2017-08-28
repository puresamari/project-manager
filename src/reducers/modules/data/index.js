import { PUSH_NAME, SET_TICK, SET_DIRECTORIES } from 'actions/data';

function todos(state = {}, action) {
  console.log(action)
  if(action.type.indexOf(PUSH_NAME) < 0) {
    return state;
  }
  switch (action.type.split(`${PUSH_NAME}:`)[1]) {
    case SET_TICK:
      // console.log(action.value)
      return {
        ...state,
        tick: action.value.value
      };
    case SET_DIRECTORIES:
      // console.log(action.value)
      return {
        ...state,
        directories: action.value.value
      };
    default:
      return state
  }
}

export default todos;
