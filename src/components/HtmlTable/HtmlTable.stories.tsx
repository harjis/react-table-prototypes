import React, { useCallback } from "react";
import { Meta, Story } from "@storybook/react";

import { Props as TableProps, HtmlTable } from "./index";
import { columns as defaultColumns, DummyData, getDummyData } from "./helpers";
import { OnCellChange } from "./types";

export default {
  title: "HtmlTable",
  component: HtmlTable,
} as Meta;

const Template: Story<TableProps<DummyData>> = (args) => {
  const onCellChange: OnCellChange<DummyData> = useCallback(
    (changedRow, changedKey, newValue) => {
      console.log("onCellChange", changedRow, changedKey, newValue);
    },
    []
  );

  return <HtmlTable {...args} rows={args.rows} onCellChange={onCellChange} />;
};

export const FitToContentWidth = Template.bind({});
FitToContentWidth.args = {
  columns: defaultColumns,
  rows: getDummyData(500),
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  columns: defaultColumns,
  rows: getDummyData(50),
  width: "100%",
};

const OverflowTemplate: Story<TableProps<DummyData>> = (args) => {
  return (
    <div style={{ height: 500, width: 500, overflow: "auto" }}>
      <HtmlTable {...args} width="1000px" />
    </div>
  );
};

export const Overflow = OverflowTemplate.bind({});
Overflow.args = {
  columns: defaultColumns,
  rows: getDummyData(50),
};
