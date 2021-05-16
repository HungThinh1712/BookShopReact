import React from "react";

import { HorizontalBarChart, VerticalBarChart,PieChart } from "@culturehq/charts";
const ReportPage = () => {
  const data = { a: 10, b: 20, c: 30, d: 40, e: 50 };
  return (
    <div style={{ display: "block" }}>
      <HorizontalBarChart class="custionChart" data={data} />
      <VerticalBarChart class="custionChart" data={data} />
      <PieChart class="custionChart" data={data} />

    </div>
  );
};

export default ReportPage;
