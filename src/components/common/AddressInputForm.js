import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import * as authActions from "./../../actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import * as provinceAction from "../../actions/provinceAction";
import * as districtAction from "../../actions/districtAction";
import * as wardAction from "../../actions/wardAction";
import { toastMessage } from "./ToastHelper";
import PlacesAutocomplete from "react-places-autocomplete";
import {useTranslation} from 'react-i18next'
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const AddressInputForm = (props) => {
  const { t } =  useTranslation();
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
    setProvinceId(e.target.value);
    setWardId("0");
    setDistrictId("0");
  };

  const handleDistrictInputChange = (e) => {
    setDistrictId(e.target.value);
    setWardId("0");
  };
  const handleWardInputChange = (e) => {
    setWardId(e.target.value);
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

  const handleSubmit = async (e) => {
    if (phone === "" || name === "") {
      toastMessage("Vui lòng nhập đầy đủ thông tin");
    } else {
      const userAddress = {
        id,
        name,
        phone,
        provinceId,
        districtId,
        wardId,
        address,
      };
      await dispatch(
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
    <option key={province.id} value={province.id}>
      {province.name}
    </option>
  ));

  const districts = useSelector((state) => state.district.districts);
  const showDistricts = districts.map((district, index) => (
    <option key={district.id} value={district.id}>
      {district.name}
    </option>
  ));

  const wards = useSelector((state) => state.ward.wards);
  const showWards = wards.map((ward, index) => (
    <option key={ward.id} value={ward.id}>
      {ward.name}
    </option>
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
  //Get autocomplete place from gg
  const [addressGoogle, setAddressGoogle] = useState("");
  const handleSelect = async (value) => {};

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{ display: "inline-block", marginTop: "20px", padding: "10px" }}
      >
        <div className="input-field" style={{ width: "1000px" }}>
          <i className="fas fa-user"></i>
          <input
            type="text"
            value={name}
            onChange={handleNameInputChange}
            placeholder={t('Customer_Management.25')}
          />
        </div>
        <div className="input-field">
          <i className="fas fa-phone"></i>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneInputChange}
            placeholder={t('Customer_Management.26')}
          />
        </div>       
        <div className="input-field">
          <i className="fas fa-city"></i>
          {/* <input value={city} onChange={handleCityInputChange} placeholder="Thành phố" /> */}
          <select
            value={provinceId}
            className="cbbox !important"
            onChange={handleProvinceInputChange}
          >
            <option value="0">{t('Customer_Management.32')}</option>
            {showProvinces}
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-archway"></i>
          <select
            value={districtId}
            className="cbbox !important"
            onChange={handleDistrictInputChange}
          >
            <option value="0">{t('Customer_Management.33')}</option>
            {showDistricts}
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-bullseye"></i>
          <select
            value={wardId}
            className="cbbox !important"
            onChange={handleWardInputChange}
          >
            <option value="0">{t('Customer_Management.34')}</option>
            {showWards}
          </select>
        </div>
        <div className="input-field">
          <i className="fas fa-map-marker"></i>
          <input
            type="text"
            onChange={handleAddressInputChange}
            value={address}
            placeholder={t('Customer_Management.18')}
          />
        </div>

        {props.tag !== "1" ? (
          <Button
            style={{ width: "100%" }}
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            {t('Customer_Management.7')}
          </Button>
        ) : (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              {t('Customer_Management.7')}
            </Button>
            <Button
              style={{ width: "100%" }}
              variant="contained"
              onClick={() => props.onClick()}
            >
              {t('Admin_Other.29')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressInputForm;
