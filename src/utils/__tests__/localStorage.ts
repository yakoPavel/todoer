import * as localStorage from "../localStorage";

const testCases = [
  { key: "SOME_KEY", value: { name: "Nick", age: 43 } },
  { key: "SOME_OTHER_KEY", value: 435 },
  { key: "ANOTHER_ONE", value: "Hi" },
];

test("correctly saves data to the storage", () => {
  const mockedSetItem = jest.fn();
  const originalSetItem = global.Storage.prototype.setItem;
  global.Storage.prototype.setItem = mockedSetItem;

  testCases.forEach(({ key, value }, index) => {
    localStorage.saveToLocalStorage(key, value);
    expect(mockedSetItem).toHaveBeenCalledTimes(index + 1);
    expect(mockedSetItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });

  global.Storage.prototype.setItem = originalSetItem;
});

test("correctly returns saved values", () => {
  testCases.forEach(({ key, value }) => {
    localStorage.saveToLocalStorage(key, value);
    expect(localStorage.getFromLocalStorage(key)).toEqual(value);
  });

  global.localStorage.clear();
});

test("returns a default value if the requested one wasn't found", () => {
  const defaultValue = "SOME_DEFAULT";
  expect(
    localStorage.getFromLocalStorage(
      "KEY_THAT_IS_NOT_IN_THE_STORAGE",
      defaultValue,
    ),
  ).toBe(defaultValue);
});
