import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ButtonMaterial from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import * as cartActions from "../../actions/cartAction";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input, Spin } from "antd";
import { toastMessage } from "./ToastHelper";
import { Select } from "antd";
import * as districtAction from "../../actions/districtAction";
import * as proviceAction from "../../actions/provinceAction";
import * as wardAction from "../../actions/wardAction";
import * as authActions from "./../../actions/authAction";
import { stat } from "@nodelib/fs.stat";
const { Option } = Select;
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "white",
  },
  toolBar: {
    [theme.breakpoints.up("sm")]: {
      marginRight: "0px",
      marginLeft: "0px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "220px",
      marginRight: "50px",
    },

    [theme.breakpoints.down("xs")]: {
      marginRight: "0px",
      marginLeft: "0px",
    },
  },
  title: {
    display: "none",
    color: "#8470FF",
    textTransform: "uppercase",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    fontSize: "40px",
    fontWeight: "700",
    cursor: "pointer",
    fontFamily: "Righteous",
  },
  address_zone: {
    display: "inline-block",
    [theme.breakpoints.up("lg")]: {
      marginTop: "20px",
      marginLeft: "250px",
    },
    [theme.breakpoints.up("md")]: {
      marginTop: "20px",
      marginLeft: "250px",
    },
  },
}));

const HeaderinPayment = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  const [name, setName] = useState(
    useSelector((state) =>
      state.auth.userData && state.auth.userData.fullName
        ? state.auth.userData.fullName
        : null
    )
  );
  const [ward, setWard] = useState(null);
  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [phone, setPhone] = useState(
    useSelector((state) =>
      state.auth.userData && state.auth.userData.phone
        ? state.auth.userData.phone
        : null
    )
  );

  const specificAddress = useSelector((state) =>
    state.auth.userData && state.auth.userData.specificAddress
      ? state.auth.userData.specificAddress
      : null
  );

  const id = useSelector((state) =>
    state.auth.userData && state.auth.userData.id
      ? state.auth.userData.id
      : null
  );

  const [visible, setVisible] = useState(false);
  const hidenModal = () => {
    setVisible(false);
  };
  const handlePaymentClick = () => {
    dispatch(cartActions.updateBookAmount(props.history));
  };
  const [address, setAddress] = useState("");
  const handleAdressInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleNameInputChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneInputChange = (e) => {
    setPhone(e.target.value);
  };
  const handleWardInputChange = (e) => {
    setWard(e);
  };
  const handleDistrictInputChange = (e) => {
    setDistrict(e);
  };
  const handleProvniceInputChange = (e) => {
    setProvince(e);
  };

  const handleSubmit = (e) => {
    if (phone === "" || !phone) {
      toastMessage("Vui lòng nhập số điện thoại");
    } else if (name === "" || !name) {
      toastMessage("Vui lòng nhập họ tên");
    } else if (address === "" || !address) {
      toastMessage("Vui lòng nhập đỉa chỉ");
    } else {
      const userAddress = {
        id,
        name,
        phone,
        address,
        province,
        district,
        ward,
      };
      dispatch(
        authActions.updateAddressOfCurrentUser(userAddress, props.history, "1")
      );
      setVisible(false);
    }
  };
  //get data provice,district,ward
  useEffect(() => {
    dispatch(proviceAction.getProvincesRequest());
    dispatch(districtAction.getDistrictsRequest(province));
    dispatch(wardAction.getWardsRequest(district));
  }, [province, district]);

  useEffect(() => {
    if (specificAddress) {
      setProvince(userData.provinceId);
      setAddress(specificAddress);
      setWard(userData.wardId);
      setDistrict(userData.districtId);
    }
  }, [specificAddress]);
  const provinces = useSelector((state) =>
    state.province.provinces ? state.province.provinces : []
  );
  console.log(provinces);
  const districts = useSelector((state) =>
    state.district.districts ? state.district.districts : []
  );
  const wards = useSelector((state) =>
    state.ward.wards ? state.ward.wards : []
  );
  const showProvinces = provinces.map((province, index) => (
    <Option value={province.id}>{province.name}</Option>
  ));
  const showDistricts = districts.map((district, index) => (
    <Option value={district.id}>{district.name}</Option>
  ));
  const showWards = wards.map((ward, index) => (
    <Option value={ward.id}>{ward.name}</Option>
  ));
  return (
    <div>
      {
        /* <Modal
        title="Cập nhật địa chỉ"
        visible={visible}
        onOk={handleSubmit}
        onCancel={hidenModal}
        style={{ top: 30 }}
        width={500}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
          shouldFetchSuggestions={address.length > 3}
          debounce={1000}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignContent: "space-between",
              }}
            >
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Họ và tên
              </label>
              <Input
                onChange={handleNameInputChange}
                value={name}
                placeholder="Nhập họ tên"
                style={{ marginBottom: "10px", borderRadius: "5px" }}
              ></Input>
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Số điện thoại
              </label>
              <Input
                onChange={handlePhoneInputChange}
                value={phone}
                style={{ marginBottom: "10px", borderRadius: "5px" }}
                placeholder="Nhập số điện thoại"
              ></Input>
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Địa chỉ
              </label>
              <Input
                style={{ borderRadius: "5px", marginBottom: "10px" }}
                {...getInputProps({ placeholder: "Nhập địa chỉ" })}
              ></Input>
              <div>
                {loading ? <Spin /> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    cursor: "pointer",
                  };
                  return (
                    <div
                      style={{ marginTop: "10px" }}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Xã/ Phường
              </label>
              <Input
                value={ward}
                style={{ marginBottom: "10px", borderRadius: "5px" }}
                placeholder="Nhập xã/ phường"
                onChange={handleWardInputChange}
              ></Input>
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Quận/ Huyện
              </label>
              <Input
                value={district}
                onChange={handleDistrictInputChange}
                style={{ marginBottom: "10px", borderRadius: "5px" }}
                placeholder="Nhập quận/ huyện"
              ></Input>
              <label style={{ fontSize: "12px", fontWeight: "600" }}>
                Tỉnh/ Thành phố
              </label>
              <Input
                value={province}
                onChange={handleProvniceInputChange}
                style={{ marginBottom: "10px", borderRadius: "5px" }}
                placeholder="Nhập tỉnh/thành phố"
              ></Input>
            </div>
          )}
        </PlacesAutocomplete>
      </Modal> */
        <Modal
          title="Cập nhật địa chỉ"
          visible={visible}
          onOk={handleSubmit}
          onCancel={hidenModal}
          style={{ top: 30 }}
          width={500}
          okText="Cập nhật"
          cancelText="Hủy"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignContent: "space-between",
            }}
          >
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Họ và tên
            </label>
            <Input
              onChange={handleNameInputChange}
              value={name}
              placeholder="Nhập họ tên"
              style={{ marginBottom: "10px", borderRadius: "5px" }}
            ></Input>
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Số điện thoại
            </label>
            <Input
              onChange={handlePhoneInputChange}
              value={phone}
              style={{ marginBottom: "10px", borderRadius: "5px" }}
              placeholder="Nhập số điện thoại"
            ></Input>
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Tỉnh/ Thành phố
            </label>
            <Select
              value={province}
              style={{ marginBottom: "10px", borderRadius: "5px" }}
              onChange={handleProvniceInputChange}
              placeholder="Chọn tỉnh/thành phố"
            >
              {showProvinces}
            </Select>
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Quận/ Huyện
            </label>
            <Select
              value={district}
              onChange={handleDistrictInputChange}
              style={{ marginBottom: "10px", borderRadius: "5px" }}
              placeholder="Nhập quận/ huyện"
            >
              {showDistricts}
            </Select>
            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Xã/ Phường
            </label>
            <Select
              value={ward}
              style={{ marginBottom: "10px", borderRadius: "5px" }}
              placeholder="Nhập xã/ phường"
              onChange={handleWardInputChange}
            >
              {showWards}
            </Select>

            <label style={{ fontSize: "12px", fontWeight: "600" }}>
              Địa chỉ
            </label>
            <Input
              style={{ borderRadius: "5px", marginBottom: "10px" }}
              onChange={handleAdressInputChange}
            ></Input>
          </div>
        </Modal>
      }
      {specificAddress ? (
        <div className={classes.address_zone}>
          <div>
            <div
              style={{ fontWeight: "700", fontSize: "30px", color: "#49654E" }}
            >
              2. Địa chỉ giao hàng
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "white",
                padding: "15px",
                marginTop: "20px",
                borderColor: "#253528",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "20px",
                }}
              >
                {userData.fullName}
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "500",
                    opacity: "0.7",
                  }}
                >
                  {userData.phone}
                </div>
              </div>
              <div
                style={{ fontSize: "16px", fontWeight: "500", opacity: "0.7" }}
              >
                {userData.specificAddress}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                }}
              >
                <ButtonMaterial
                  variant="contained"
                  size="small"
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#114b5f",
                    fontWeight: "700",
                    color: "white",
                  }}
                  onClick={handlePaymentClick}
                >
                  {t("Customer_Shopping_Payment.9")}
                </ButtonMaterial>
                {/* <ButtonMaterial variant="contained" size='small'  onClick={(hideAddressForm)=>handleOpenAddressFormClick(hideAddressForm)} >{t('Customer_Shopping_Payment.10')}</ButtonMaterial> */}
                <ButtonMaterial
                  variant="contained"
                  size="small"
                  onClick={() => setVisible(true)}
                >
                  {t("Customer_Shopping_Payment.10")}
                </ButtonMaterial>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.address_zone}>
          <div>
            <div
              style={{ fontWeight: "700", fontSize: "30px", color: "#49654E" }}
            >
              2. Địa chỉ giao hàng
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "5px",
                background: "white",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ fontSize: "16px", fontWeight: "500" }}>
                Bạn chưa cập nhật địa chỉ giao hàng
              </div>
              <div
                style={{
                  marginTop: "10px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "#8ba889",
                    fontWeight: "600",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  onClick={() => setVisible(true)}
                >
                  <span style={{ display: "flex", alignItems: "center" }}>
                    Cập nhật địa chỉ giao hàng
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default withRouter(HeaderinPayment);
