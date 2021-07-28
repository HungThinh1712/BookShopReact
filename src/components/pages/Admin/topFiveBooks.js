import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import * as statisticActions from "../../../actions/statisticAction";
import Header from "../../common/Header";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import { DatePicker } from "antd";
import BreadCrumb from "../../common/Breadcrumbs";
import moment from "moment";
import { ConfigProvider } from "antd";
import Vi from "antd/lib/locale/vi_VN";
import { withRouter } from "react-router-dom";
const PieChart = (props) => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const onChange = (event, values) => {
    const arr = values.split("-");
    setYear(arr[0]);
    setMonth(arr[1]);
  };
  useEffect(() => {
    dispatch(statisticActions.getTopFive(month, year));
  }, [dispatch, year, month]);
  const topFives = useSelector((state) =>
    state.statistics.topFiveBooks ? state.statistics.topFiveBooks : []
  );

  const data = {
    labels: topFives.map((x) => x.bookName),
    datasets: [
      {
        label: "# VNĐ",
        data: topFives.map((x) => x.sum),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  function monthCellRender(value, locale) {
    return <span>{`Tháng ${value.month() + 1}`}</span>;
  }
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
              onClick2={() => props.history.push("/admin/topfivebooks")}
            ></BreadCrumb>
          </div>
          <div
            style={{
              width: "1100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ConfigProvider locale={Vi}>
              <DatePicker
                allowClear={false}
                style={{ width: "300px", marginBottom: "20px" }}
                defaultValue={moment(new Date())}
                onChange={onChange}
                picker="month"
                monthCellRender={monthCellRender}
              />
            </ConfigProvider>

            <div style={{ width: "510px" }}>
              {topFives.length > 0 ? (
                <Pie data={data} />
              ) : (
                <div
                  style={{
                    height: "510px",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "15px",
                    fontWeight: "600",
                  }}
                >
                  Chưa có dữ liệu thống kê
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PieChart);
