import { CustomColumn } from "../types";

export type DummyData = {
  id: string;
  name: string;
  someName: string;
  age: number;
  gender: number;
  someBoolean: boolean;
};

export const columns: CustomColumn<DummyData>[] = [
  { key: "id", title: "Id", type: "text" },
  { key: "name", title: "Name", type: "text" },
  { key: "someName", title: "Some other name", type: "text" },
  { key: "age", title: "Age", type: "text" },
  { key: "gender", title: "Gender", type: "text" },
  { key: "someBoolean", title: "Some boolean", type: "checkbox" },
];

export const getDummyData = (numberOfRows = 10): DummyData[] =>
  range(numberOfRows).map((i) => ({
    id: i.toString(),
    name: `Long long long Row ${i}`,
    someName: `Name ${i * 25}`,
    age: i * 3,
    gender: 0,
    someBoolean: false,
  }));

function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i);
}
