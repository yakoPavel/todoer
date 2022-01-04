/** Saves a value to the local storage. */
function saveToLocalStorage(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/** Retrieves a value from the local storage. */
function getFromLocalStorage<T>(key: string, defaultValue?: T) {
  const itemInTheStore = window.localStorage.getItem(key);
  return itemInTheStore ? (JSON.parse(itemInTheStore) as T) : defaultValue;
}

export { getFromLocalStorage, saveToLocalStorage };
