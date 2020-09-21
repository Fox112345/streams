import _ from "lodash";

import {
  CREATE_STREAM,
  GET_STREAM,
  GET_STREAMS,
  DEL_STREAM,
  EDIT_STREAM,
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case GET_STREAMS:
      return { ..._.mapKeys(action.payload, "id") };
    case DEL_STREAM:
      return _.omit(state, [action.payload.id]);
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload };

    default:
      return state;
  }
};
