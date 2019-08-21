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

function notes(state = { general: [] }, action) {
  switch (action.type) {
    case types.GET_NOTES: // TODO: I don't think this is needed
      return state;
    case types.ADD_NOTE: {
      const updatedNotes = Object.assign(...state); // This is an array of objects, the copy is looking bad here
      updatedNotes[action.label].append(action.note);

      return {
        ...state,
        notes: updatedNotes,
      };
    }
    case types.DELETE_NOTE:
      return {
        notes: state.filter(note => note.title !== action.noteTitle),
      };
    default:
      return state;
  }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case types.GET_NOTES:
      return state;
    case types.ADD_NOTE:
      return {
        ...state,
        notes: notes(state.notes, action),
      };
    case types.DELETE_NOTE:
      return {
        notes: notes(state.notes, action),
      };
    default:
      return state; // Do nothing if unknown action
  }
}
