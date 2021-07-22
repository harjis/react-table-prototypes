import React from "react";
import { Meta, Story } from "@storybook/react";

import { Props as TableProps, HtmlTable } from "./index";
import { columns as defaultColumns, DummyData, getDummyData } from "./helpers";

export default {
  title: "HtmlTable",
  component: HtmlTable,
} as Meta;

const Template: Story<TableProps<DummyData>> = (args) => {
  return <HtmlTable {...args} />;
};

export const FitToContentWidth = Template.bind({});
FitToContentWidth.args = {
  columns: defaultColumns,
  data: getDummyData(50),
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  columns: defaultColumns,
  data: getDummyData(50),
  fullWidth: true,
};
