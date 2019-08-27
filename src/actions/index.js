import * as types from '../constants/ActionTypes';
import { getNotes } from '../apis/web-storage-apis';

export function addNote(label, note) {
  return {
    type: types.ADD_NOTE,
    label,
    note,
  };
}

export function deleteNote(label, noteTitle) {
  return {
    type: types.DELETE_NOTE,
    label,
    noteTitle,
  };
}

export function updateNote(id, label, note) {
  return {
    type: types.UPDATE_NOTE,
    id,
    label,
    note,
  };
}

export function requestLabels() {
  return {
    type: types.REQUEST_LABELS,
  };
}

export function recieveLabels(labels) {
  return {
    type: types.RECIEVE_LABELS,
    labels,
  };
}

export function requestNotes(label) {
  console.log('request notes called');
  return {
    type: types.REQUEST_NOTES,
    label,
  };
}

export function recieveNotes(label, notes) {
  return {
    type: types.RECIEVE_LABELS,
    label,
    notes,
  };
}

export function selectLabel(label) {
  return {
    type: types.SELECT_LABEL,
    label,
  };
}

/* Thunk action creators */
export function fetchNotes(label) {
  console.log('fetch notes called');
  return (dispatch) => {
    console.log('dispatch called');
    dispatch(requestNotes(label));
    return getNotes.then(
      notes => dispatch(recieveNotes(label, notes)),
      err => console.log('Error on fetchNotes', err),
    );
  };
}
