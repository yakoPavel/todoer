import { act, renderHook } from "@testing-library/react-hooks";
import { DropResult } from "react-beautiful-dnd";

import { useDraggablesState } from "../useDraggablesState";

function getDropResult(fromIndex: number, toIndex: number) {
  return {
    source: { index: fromIndex },
    destination: { index: toIndex },
  } as DropResult;
}

test("correctly changes the order of draggables", () => {
  const { result } = renderHook(() =>
    useDraggablesState({
      componentGenerator: () => null,
      data: Array.from({ length: 5 }, (_, index) => ({
        id: `COMPONENT_${index}`,
      })),
    }),
  );

  const secondArgumentMock = {} as any;

  act(() => result.current.onDragEnd(getDropResult(0, 1), secondArgumentMock));
  expect(result.current.draggables.map(({ id }) => id)).toMatchInlineSnapshot(`
    Array [
      "COMPONENT_1",
      "COMPONENT_0",
      "COMPONENT_2",
      "COMPONENT_3",
      "COMPONENT_4",
    ]
  `);

  act(() => result.current.onDragEnd(getDropResult(2, 4), secondArgumentMock));
  expect(result.current.draggables.map(({ id }) => id)).toMatchInlineSnapshot(`
    Array [
      "COMPONENT_1",
      "COMPONENT_0",
      "COMPONENT_3",
      "COMPONENT_4",
      "COMPONENT_2",
    ]
  `);
});
