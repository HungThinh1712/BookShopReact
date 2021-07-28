import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import * as statisticActions from "../../../actions/statisticAction";
import Header from "../../common/Header";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { DatePicker } from "antd";
import BreadCrumb from "../../common/Breadcrumbs";
import moment from "moment";
import { withRouter } from "react-router-dom";
const VerticalBar = (props) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2021);
  const onYearChange = (event, values) => {
    setYear(values);
  };
  useEffect(() => {
    dispatch(statisticActions.getStatisticByMonths(year));
  }, [dispatch, year]);
  const statistics = useSelector((state) => state.statistics.statisticByMonths);
  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };
  const [data, setData] = useState({});
  useEffect(() => {
    if (statistics) {
      setData({
        labels: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12",
        ],
        datasets: [
          {
            label: "# VNĐ",
            data: statistics,
            backgroundColor: ["rgb(255, 99, 132)"],
            borderColor: ["rgb(255, 99, 132)"],
            borderWidth: 1,
          },
        ],
      });
    }
  }, []);

  return (
    <div>
      <Header notShow="notShow" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBarAdminPage />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "250px",
            paddingBottom: "50px",
          }}
        >
          <div style={{ marginTop: "120px", marginLeft: "10px" }}>
            <BreadCrumb
              breadcrumb="Thống kê sản phẩm bán chạy"
              onClick={() => props.history.push("/admin")}
              onClick2={() => props.history.push("/admin/report_page")}
            ></BreadCrumb>
          </div>
          <div style={{ width: "1100px", paddingLeft: "50px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <DatePicker
                style={{ width: "300px", marginBottom: "20px" }}
                defaultValue={moment("2021/01/01", "YYYY")}
                onChange={onYearChange}
                picker="year"
              />
            </div>

            <Bar
              style={{
                background: "white",
                borderRadius: "5px",
                padding: "5px",
              }}
              data={data}
              options={options}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(VerticalBar);
