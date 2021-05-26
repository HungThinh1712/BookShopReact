import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import * as statisticActions from "../../../actions/statisticAction";
import Header from "../../common/Header";
import SideBarAdminPage from "../../common/SideBarAdminPage";
import DropDown from "../../common/DropDown";
import BreadCrumb from "../../common/Breadcrumbs";
const VerticalBar = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2021);
  const sortPrice = [
    { id: 2021, name: "2021" },
    { id: 2020, name: "2020" },
    { id: 2019, name: "2019" },
  ];
  const handleChange = (event, values) => {
    values != null ? setYear(values.id) : setYear(null);
    console.log(year);
  };
  useEffect(() => {
    dispatch(statisticActions.getStatisticByMonths(year));
  }, [dispatch, year]);
  const statistics = useSelector((state) =>
    state.statistics.statisticByMonths ? state.statistics.statisticByMonths : []
  );

  const data = {
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

  return (
    <div>
      <Header notShow="notShow" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        <SideBarAdminPage />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginTop: "120px", marginLeft: "10px" }}>
            <BreadCrumb breadcrumb="Thống kê doanh thu theo năm"></BreadCrumb>
          </div>
          <div style={{ width: "1200px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <DropDown
                handleChange={handleChange}
                label="Chọn năm"
                data={sortPrice}
                type="4"
              />
            </div>

            <Bar data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalBar;
