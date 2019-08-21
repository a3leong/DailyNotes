import * as types from '../constants/ActionTypes';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const GET_NOTES = 'GET_NOTES';

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

export function updateNote(label, note) {
  return {
    type: types.UPDATE_NOTE,
    label,
    note,
  };
}

export function getNotes() {
  return {
    type: types.GET_NOTES,
  };
}
