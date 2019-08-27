/*
 * API's to interact with local storage for browser
 * Should be able to CRUD as well as handle the timestamp (we might be able to run a periodic or open check for a prompt)
 *
 *
 */

// Local storage items
/*
sessionTimestamp: <int> // Epoch time when session was created in ms
notes-<label>: [<note>] // An object 
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

/* TODO: Mimic error response/response call on success failure */
// Reason for returning at end instead of Promise blocking whole execution:
// we want to be able to catch errors and modify the response to look like an http response

import { localStorageGetItem, localStorageSetItem } from './local-storage-util';

const SESSION_TIMEOUT = 24; // In hours. TODO: Move to a config file or let the user set

const LS_KEYS = Object.freeze({
  SESSION_TIME_STAMP: 'sessionTimestamp',
  ID_COUNTER: 'idCounter',
});


/* getId()
 * Description: Get an int ID for the note for reference.
 *              This function will also handle incrementing the note counter
 * Return Value: The id for the note as an number value
 */
function getId() {
  const id = localStorageGetItem(LS_KEYS.ID_COUNTER);
  const updatedCounter = id + 1;
  localStorageSetItem(LS_KEYS.ID_COUNTER, updatedCounter);
  return id;
}

function sessionOutdated() {
  const sessionTimestamp = localStorageGetItem(LS_KEYS.SESSION_TIME_STAMP);
  const latestTime = Date.now();
  const timeDiff = latestTime - sessionTimestamp;
  return timeDiff * 1000 * 60 * 60 >= SESSION_TIMEOUT;
}

function initSession() {
  try {
    localStorageSetItem(LS_KEYS.SESSION_TIME_STAMP, Date.now());
    localStorageSetItem(LS_KEYS.ID_COUNTER, 1);
    localStorageSetItem(LS_KEYS.LABELS, [{ label: 'General', key: 'notes-general' }]);
    localStorageSetItem('notes-general', [{ _id: 0, type: 'basic', data: 'Hello world!' }]); // start off with only one type of note
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

/* clearSession()
  * Description: Clear the users storage data, if no override passed, will fail to act
  *              if at least designated time has not passed (should be 24hrs)
  * Return Value: Returns true if succeeded, false if it did not
  */
export async function clearSession(override = false) {
  if (override !== false && sessionOutdated()) {
    localStorage.clear();
    await initSession();
    return true;
  }

  // Check time passed, if less than 24hrs then only do so if override, else pass fals
  return false;
}

// TODO: What is this even used for, delete this?
export function getSession() {
  if (!localStorage.getItem(LS_KEYS.NOTES)) {
    return initSession();
  }

  try {
    const data = localStorageGetItem(LS_KEYS.NOTES);
    return Promise.resolve({ res: { data } });
  } catch (err) {
    return Promise.reject(err);
  }
}

/* Might be good to add a redis instance locking mechanism here */
export function addNote(label, note) {
  try {
    // First modify note with id val
    const noteRef = note;
    const id = getId();
    noteRef._id = id;
    const notes = localStorageGetItem(`notes-${label}`);
    notes[label].append(note);
    localStorageSetItem(LS_KEYS.NOTES, noteRef);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}

export function getNotes(label) {
  console.log(`get notes: ${label} called`);
  try {
    const notes = localStorageGetItem(`notes-${label}`);
    return Promise.resolve(notes);
  } catch (err) {
    return Promise.reject(err);
  }
}
