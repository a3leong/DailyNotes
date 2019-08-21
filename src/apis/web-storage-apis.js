/*
 * API's to interact with local storage for browser
 * Should be able to CRUD as well as handle the timestamp (we might be able to run a periodic or open check for a prompt)
 *
 *
 */

// Local storage items
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

const SESSION_TIMEOUT = 24; // In hours. TODO: Move to a config file or let the user set


function sessionOutdated() {
  const sessionTimestamp = localStorage.getItem('sessionTimestamp');
  const latestTime = Date().getMilliseconds();
  const timeDiff = latestTime - sessionTimestamp;
  return timeDiff * 1000 * 60 * 60 >= SESSION_TIMEOUT;
}

/* clearSession()
  * Description: Clear the users storage data, if no override passed, will fail to act
  *              if at least designated time has not passed (should be 24hrs)
  * Return Value: Returns true if succeeded, false if it did not
  */
export function clearSession(override = false) {
  if (override !== false && sessionOutdated()) {
    localStorage.clear();
    localStorage.initSession();
    return true;
  }

  // Check time passed, if less than 24hrs then only do so if override, else pass false
  return false;
}

function initSession() {
  localStorage.setItem('sessionTimestamp', Date().getMilliseconds());
  localStorage.setItem('notes', { general: [] }); // start off with only one type of note
}

export function getSession() {
  if (!localStorage.getItem('notes')) {
    initSession();
  }

  return Promise.resolve(localStorage.getItem('notes'));
}
