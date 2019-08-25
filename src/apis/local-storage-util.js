// Wrappers for localStorage to cut down on JSON.parse and JSON.stringify
export function localStorageSetItem(field, itemObj) {
  localStorage.setItem(field, JSON.stringify(itemObj));
}

export function localStorageGetItem(field) {
  return JSON.parse(localStorage.getItem(field));
}
