/** Saves a value to the local storage. */
function saveToLocalStorage(key: string, value: unknown) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

type GetFromLocalStorageReturn<Data> = Data extends infer ActualData
  ? unknown extends ActualData
    ? unknown | null
    : ActualData
  : never;

/** Retrieves a value from the local storage. */
function getFromLocalStorage<Data = unknown>(
  key: string,
  defaultValue?: Data,
): GetFromLocalStorageReturn<Data> {
  const itemInTheStore = window.localStorage.getItem(key);

  if (itemInTheStore === null) {
    return (defaultValue ?? itemInTheStore) as GetFromLocalStorageReturn<Data>;
  }

  return JSON.parse(itemInTheStore);
}

export { getFromLocalStorage, saveToLocalStorage };
