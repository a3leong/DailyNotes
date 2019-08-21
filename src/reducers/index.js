/*
sessionTimestamp: <int> // Epoch time when session was created in ms
notes: { // Object to notes list mapping
    <string>: <note> // Map string category to note
} // Notes user has created
note: { // List of notes
    title: <string> // Note header, is auto generated at read if doesn't exist (means this field is not required)
    category: <string> // User defined category
    type: basic | list | scribble // Type of note, will define the data payload
    data: <string> // Note data,
}


 */

import * as types from '../constants/ActionTypes';
import { getNotes } from '../actions';

const initialState = {
  sessionTimestamp: Date().getMilliseconds(),
  notes: {
    general: [],
  },
};

function todoApp(state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTES:
      return {
        ...state,
        notes: action.notes,
      };
    default:
      break;
  }
  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}
