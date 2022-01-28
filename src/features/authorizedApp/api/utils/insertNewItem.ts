type Options<Data> = {
  destination: Data[];
  itemToInsert: Data;
  direction?: "above" | "below";
  triggerId?: string;
};

/**
 * Inserts a new item to the array based on the `direction` argument.
 * If the `direction` ot the `triggerId` is not specified, pushes the new
 * item to the end of the array.
 *
 * @returns A copy of the `destination` array with the new item inserted.
 */
export function insertNewItem<Data extends { id: string }>({
  destination,
  itemToInsert,
  direction,
  triggerId,
}: Options<Data>) {
  const destinationCopy = [...destination];

  if (direction && triggerId) {
    const triggerItemIndex = destinationCopy.findIndex(
      (item) => item.id === triggerId,
    );
    if (triggerItemIndex < 0) return destinationCopy;

    if (direction === "above") {
      destinationCopy.splice(triggerItemIndex, 0, itemToInsert);
    } else {
      destinationCopy.splice(triggerItemIndex + 1, 0, itemToInsert);
    }
  } else {
    destinationCopy.push(itemToInsert);
  }

  return destinationCopy;
}
