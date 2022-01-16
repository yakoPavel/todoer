import * as fc from "fast-check";

import * as localStorage from "../localStorage";

describe("The `localStorage` util", () => {
  afterEach(() => {
    global.localStorage.clear();
  });

  test("Correctly saves and reads data from the storage", () => {
    fc.assert(
      fc.property(
        fc.string(),
        fc.anything({
          values: [fc.boolean(), fc.integer(), fc.string()],
        }),
        (key, value) => {
          localStorage.saveToLocalStorage(key, value);
          expect(localStorage.getFromLocalStorage(key)).toEqual(value);
        },
      ),
    );
  });

  describe("When the requested value wasn't found and the default value is specified", () => {
    test("Returns the default value", () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.anything({
            values: [fc.boolean(), fc.integer(), fc.string()],
          }),
          (key, defaultValue) => {
            expect(localStorage.getFromLocalStorage(key, defaultValue)).toBe(
              defaultValue,
            );
          },
        ),
      );
    });
  });

  describe("When the requested value wasn't found and the default value is not specified", () => {
    test("Returns null", () => {
      const key = "SOME_KEY_THAT_IS_NOT_IN_THE_STORAGE";
      expect(localStorage.getFromLocalStorage(key)).toBeNull();
    });
  });
});
