import * as types from '../constants/ActionTypes';
export const DELETE_NOTE = 'DELETE_NOTE';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const GET_NOTES = 'GET_NOTES';

export function addNote(note) {
  return {
    type: types.ADD_NOTE,
    note,
  };
}

export function deleteNote(note) {
  return {
    type: types.DELETE_NOTE,
    note,
  };
}

export function updateNote(note) {
  return {
    type: types.UPDATE_NOTE,
    note,
  };
}

export function getNotes(notes) {
  return {
    type: types.GET_NOTES,
    notes,
  };
}
