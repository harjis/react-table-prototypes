import { createContext } from "../../../context/contextCreator";
import { initialReturn, useSelectedCell } from "../hooks/useSelectedCell";

const { Provider: SelectedCellProvider, useContext: useSelectedCellContext } =
  createContext(useSelectedCell, initialReturn);

export { SelectedCellProvider, useSelectedCellContext };
