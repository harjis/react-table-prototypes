import { CustomColumn } from "../types";

export type DummyData = {
  id: string;
  name: string;
  someName: string;
  age: number;
  gender: number;
};

export const columns: CustomColumn<DummyData>[] = [
  { key: "id", title: "Id", type: "text" },
  { key: "name", title: "Name", type: "input" },
  { key: "someName", title: "Some other name", type: "input" },
  { key: "age", title: "Age", type: "input" },
  { key: "gender", title: "Gender", type: "select" },
];

export const getDummyData = (numberOfRows = 10): DummyData[] =>
  range(numberOfRows).map((i) => ({
    id: i.toString(),
    name: `Long long long Row ${i}`,
    someName: `Name ${i * 25}`,
    age: i * 3,
    gender: 0,
  }));

function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}
