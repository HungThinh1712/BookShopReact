import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as statisticActions from "../../../actions/statisticAction";

import {
  HorizontalBarChart,
  VerticalBarChart,
  PieChart,
} from "@culturehq/charts";
const ReportPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(statisticActions.getStatisticByMonths());
  }, [dispatch]);
  const statistics = useSelector((state) =>
    state.statistics.statisticByMonths ? state.statistics.statisticByMonths : []
  );
  let data = {};
  if(statistics.length > 0 && statistics){
    for (var i = 0; i < statistics.length; i++) {
      data[statistics[i].month] = statistics[i].totalPrice;
    }
  }

  return (
    <div style={{ display: "block" }}>
      <VerticalBarChart class="custionChart" data={data} />
    </div>
  );
};

export default ReportPage;
