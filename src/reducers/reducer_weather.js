import {FETCH_WEATHER} from '../actions/index';

export default function(state = [], action) {
  if (action.error) {
    return state;
  }
  switch (action.type) {
    case FETCH_WEATHER:
      //return state.concat([action.payload.data]); //does the same as line below
      return [ action.payload.data, ...state ];
  }
  return state;
}