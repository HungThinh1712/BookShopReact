import React, { useState } from "react";
import { Checkbox } from "antd";
import { Tag } from "antd";
import moment from "moment";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { Menu, Dropdown } from "antd";

const PromotionItem = (props) => {
  const menu = (
    <Menu style={{ pointerEvents: "none" }}>
      <Menu.Item>
        <li style={{ fontWeight: "600" }}>
          <ul>
            {" "}
            {`Sử dụng trước ngày ${
              props.promotion
                ? moment(props.promotion.endDate).format("DD/MM/YYYY")
                : null
            }`}
          </ul>
          <ul>{`Giảm ${props.promotion.discountMoney
            .toString()
            .replace(
              /(\d)(?=(\d\d\d)+(?!\d))/g,
              "$1."
            )}đ cho đơn hàng từ ${props.promotion.minMoney
            .toString()
            .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")}đ.`}</ul>
          <ul>Mỗi khách hàng chỉ được áp dụng 1 lần.</ul>
        </li>
      </Menu.Item>
    </Menu>
  );
  const showPromotionTitle = () => {
    if (props.promotion.promotionType === 0) {
      return (
        <span>{`${props.promotion.promotionCode} - Giảm giá số tiền`}</span>
      );
    } else {
      return (
        <span>{`${props.promotion.promotionCode} - Miễn phí giao hàng`}</span>
      );
    }
  };

  return (
    <div
      onClick={props.onClick}
      className="promotion_card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "15px",
        borderRadius: "5px",
        marginBottom: "9px",
      }}
    >
      <div>
        <div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "600",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {showPromotionTitle()}
            <Dropdown overlay={menu} arrow>
              <ExclamationCircleOutlined />
            </Dropdown>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {`Sử dụng trước ngày ${
              props.promotion
                ? moment(props.promotion.endDate).format("DD/MM/YYYY")
                : null
            }`}
            {props.tag === "Checked" ? (
              <Tag
                style={{ display: "flex", alignItems: "center",marginRight:'0px' }}
                icon={<CheckCircleOutlined />}
                color="success"
              >
                Đã chọn
              </Tag>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionItem;
