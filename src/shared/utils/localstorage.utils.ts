export function getItemFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}

export function setItemLocalStorage(key: string, value: string) {
  return localStorage.setItem(key, value);
}

export function removeItemLocalStorage(key: string) {
  return localStorage.removeItem(key);
}
