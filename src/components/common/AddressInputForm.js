import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import * as authActions from "./../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import * as provinceAction from "../../actions/provinceAction";
import * as districtAction from "../../actions/districtAction";
import * as wardAction from "../../actions/wardAction";
import { useTranslation } from "react-i18next";
import { toastMessage } from "./ToastHelper";
import { Input } from "antd";
import { Select } from "antd";
const { Option } = Select;

const AddressInputForm = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = props.id;
  const [name, setName] = useState(props.name);
  const [phone, setPhone] = useState(props.phone);

  const [address, setAddress] = useState(props.specificAddress);
  const [provinceId, setProvinceId] = useState(
    props.provinceId ? props.provinceId : "0"
  );
  const [districtId, setDistrictId] = useState(
    props.districtId ? props.districtId : "0"
  );
  const [wardId, setWardId] = useState(props.wardId ? props.wardId : "0");

  const handleProvinceInputChange = (e) => {
    setProvinceId(e);
    setWardId("0");
    console.log(provinceId)
    setDistrictId("0");
  };

  const handleDistrictInputChange = (e) => {
    setDistrictId(e);
    setWardId("0");
  };
  const handleWardInputChange = (e) => {
    setWardId(e);
  };

  const handleAddressInputChange = (e) => {
    setAddress(e.target.value);
  };
  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneInputChange = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit =  (e) => {
    if (phone === "" || !phone) {
      toastMessage("Vui lòng nhập số điện thoại");
    }
    else if (name === "" || !name) {
      toastMessage("Vui lòng nhập họ tên");
    }
    else if (provinceId === "0" || !provinceId) {
      toastMessage("Vui lòng chọn tỉnh/ thành phố");
    }
    else if (districtId === "0" || !districtId) {
      toastMessage("Vui lòng chọn quận/ huyện");
    }
    else if (wardId === "0" || !wardId) {
      toastMessage("Vui lòng chọn xã/ phường");
    }
    else if (address === "" || !address) {
      toastMessage("Vui lòng nhập đỉa chỉ");
    }
   
     else  {
      const userAddress = {
        id,
        name,
        phone,
        provinceId,
        districtId,
        wardId,
        address,
      };
       dispatch(
        authActions.updateAddressOfCurrentUser(
          userAddress,
          props.props.history,
          props,
          props.tag
        )
      );
    }
  };
  const provinces = useSelector((state) => state.province.provinces);
  const showProvinces = provinces.map((province, index) => (
    <Option  value={province.id}>
      {province.name}
    </Option>
  ));

  const districts = useSelector((state) => state.district.districts);
  const showDistricts = districts.map((district, index) => (
    <Option  value={district.id}>
      {district.name}
    </Option>
  ));

  const wards = useSelector((state) => state.ward.wards);
  const showWards = wards.map((ward, index) => (
    <Option  value={ward.id}>
      {ward.name}
    </Option>
  ));

  useEffect(() => {
    dispatch(provinceAction.getProvincesRequest());
  }, [dispatch]);

  useEffect(() => {
    dispatch(districtAction.getDistrictsRequest(provinceId));
  }, [provinceId, dispatch]);
  useEffect(() => {
    dispatch(wardAction.getWardsRequest(districtId));
  }, [districtId, dispatch]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          marginTop: "15px",
          padding: "10px",
          flexDirection: "column",
          width: "500px",
        }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontStyle: "bold",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Họ và tên:
          </p>
          <Input
            size="large"
            style={{ width: "350px", marginBottom: "15px" }}
            value={name}
            onChange={handleNameInputChange}
            placeholder="Họ và tên"
          />
        </div>

        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontStyle: "bold",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Số điện thoại:
          </p>
          <Input
            size="large"
            style={{ width: "350px", marginBottom: "15px" }}
            value={phone}
            onChange={handlePhoneInputChange}
            placeholder={t("Customer_Management.26")}
          />
        </div>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontStyle: "bold",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Tỉnh/ Thành:
          </p>
          <Select
            style={{ marginBottom: "15px", width: "350px" }}
            size="large"
            defaultValue={provinceId}
            onChange={handleProvinceInputChange}
          >
            <Option value="0">Chọn Tỉnh/ Thành phố</Option>
            {showProvinces}
          </Select>
        </div>

        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontStyle: "bold",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Quận/ Huyện:
          </p>
          <Select
            style={{ marginBottom: "15px", width: "350px" }}
            size="large"
            defaultValue={districtId}
            onChange={handleDistrictInputChange}
          >
            <Option value="0">Chọn Quận/ Huyện</Option>

            {showDistricts}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontStyle: "bold",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Xã/ Phường:
          </p>
          <Select
            style={{ marginBottom: "15px", width: "350px" }}
            size="large"
            defaultValue={wardId}
            onChange={handleWardInputChange}
          >
            <Option value="0">Chọn Xã/ Phường</Option>

            {showWards}
          </Select>
        </div>
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <p
            style={{
              marginTop: "10px",
              fontStyle: "bold",
              fontWeight: "600",
              display: "flex",
            }}
          >
            Địa chỉ:
          </p>
          <div>
            <Input
              size="large"
              style={{ width: "350px", marginBottom: "15px" }}
              value={address}
              onChange={handleAddressInputChange}
              placeholder="Địa chỉ"
            />
            {props.tag !== "1" ? (
              <div>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Cập nhật
                </Button>
                <div></div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Cập nhật
                </Button>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  onClick={() => props.onClick()}
                >
                  Hủy
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressInputForm;
