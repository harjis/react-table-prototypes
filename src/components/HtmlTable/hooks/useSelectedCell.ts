import { useCallback, useState } from "react";

type SelectedCell = {
  rowIndex: number;
  columnIndex: number;
};
type Props = {
  maxColumnIndex: number;
  maxRowIndex: number;
};
type Return = {
  selectedCell: SelectedCell | null;
  selectCell: (rowIndex: number, columnIndex: number) => void;
  moveSelection: (direction: string) => void;
};
export const initialReturn: Return = {
  selectedCell: null,
  selectCell: () => {
    throw Error("Implement selectCell");
  },
  moveSelection: () => {
    throw Error("Implement moveSelection");
  },
};
export const useSelectedCell = (props: Props): Return => {
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);

  const selectCell = useCallback(
    (rowIndex: number, columnIndex: number) =>
      setSelectedCell({ rowIndex, columnIndex }),
    []
  );

  const moveSelection = useCallback(
    (direction: string) => {
      setSelectedCell((prevState) => {
        if (!prevState) return prevState;
        if (direction === "ArrowUp") {
          return {
            columnIndex: prevState.columnIndex,
            rowIndex: Math.max(0, prevState.rowIndex - 1),
          };
        } else if (direction === "ArrowDown") {
          return {
            columnIndex: prevState.columnIndex,
            rowIndex: Math.min(props.maxRowIndex, prevState.rowIndex + 1),
          };
        } else if (direction === "ArrowRight") {
          return {
            columnIndex: Math.min(
              props.maxColumnIndex,
              prevState.columnIndex + 1
            ),
            rowIndex: prevState.rowIndex,
          };
        } else if (direction === "ArrowLeft") {
          return {
            columnIndex: Math.max(0, prevState.columnIndex - 1),
            rowIndex: prevState.rowIndex,
          };
        } else {
          return prevState;
        }
      });
    },
    [props.maxColumnIndex, props.maxRowIndex]
  );

  return { selectedCell, selectCell, moveSelection };
};
