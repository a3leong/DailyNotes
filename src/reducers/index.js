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
import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes';

const initialState = {
  sessionTimestamp: Date.now(),
  notes: {
    general: {
      isFetching: true,
      items: [],
    },
  },
  sidebar: {
    isFetching: true,
    labels: [
      { label: 'General', key: 'general' },
    ],
  },
  selectedLabelKey: 'general',
};

function selectedLabelKey(state = initialState.selectedLabelKey, action) {
  switch (action.type) {
    case types.SELECT_LABEL:
      return {
        ...state,
        selectedLabelKey: action.label,
      };
    default:
      return state;
  }
}

function sidebar(state = initialState.sidebar, action) {
  switch (action.type) {
    case types.REQUEST_LABELS:
    case types.RECIEVE_LABELS:
    default:
      return state;
  }
}

function notes(state = initialState.notes, action) {
  switch (action.type) {
    case types.REQUEST_NOTES:
      return {
        ...state,
        [action.label]: { isFetching: true, items: [] },
      };
    case types.RECIEVE_NOTES:
      return {
        ...state,
        [action.label]: { isFetching: false, items: action.notes },
      };
    case types.ADD_NOTE:
      return {
        ...state,
        [action.label]: { isFetching: false, items: action.notes },
      };
    case types.DELETE_NOTE:
      return {
        ...state,
        [action.label]: { isFetching: false, items: action.notes },
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  sidebar,
  notes,
  selectedLabelKey,
});

export default rootReducer;
