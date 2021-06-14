import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ButtonMaterial from "@material-ui/core/Button";
import AddressInputForm from "./AddressInputForm";
import { useSelector, useDispatch } from "react-redux";
import Zoom from "react-reveal/Zoom";
import * as cartActions from "../../actions/cartAction";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input, Spin } from "antd";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

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
  const [hideAddressForm, setHideAdressForm] = useState("none");
  const userData = useSelector((state) =>
    state.auth.userData ? state.auth.userData : null
  );
  const fullName = useSelector((state) =>
    state.auth.userData && state.auth.userData.fullName
      ? state.auth.userData.fullName
      : null
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

  const handleOpenAddressFormClick = (value) => {
    if (value === "" || value === undefined) {
      setHideAdressForm("none");
    } else {
      setHideAdressForm("");
    }
  };
  const [visible, setVisible] = useState(false);
  const hidenModal = () => {
    setVisible(false);
  };
  const handlePaymentClick = () => {
    dispatch(cartActions.updateBookAmount(props.history));
  };
  const [address, setAddress] = useState("");
  const handleSelect = async (value) => {};
  return (
    <div>
      <Modal
        title="Cập nhật địa chỉ"
        visible={visible}
        onOk={hidenModal}
        onCancel={hidenModal}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
          shouldFetchSuggestions={address.length > 3}
          debounce = {1000}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <Input
                {...getInputProps({ placeholder: "Nhập địa chỉ" })}
              ></Input>
              <div>
                {loading ? <Spin /> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return <div {...getSuggestionItemProps(suggestion,{style})}>{suggestion.description}</div>;
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Modal>
      {specificAddress ? (
        <div className={classes.address_zone}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "30px", color: "red" }}>
              2. {t("Customer_Shopping_Payment.6")}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                borderWidth: "2px",
                padding: "10px",
                marginTop: "20px",
                borderColor: "#253528",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  fontWeight: "800",
                  color: "red",
                  fontFamily: "Roboto ",
                }}
              >
                {userData.fullName}
              </div>
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {t("Customer_Shopping_Payment.6")}: {userData.specificAddress},{" "}
                {userData.wardName}, {userData.districtName},{" "}
                {userData.provinceName}
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    paddingRight: "5px",
                  }}
                >
                  {t("Customer_Shopping_Payment.7")}{" "}
                </div>
                <div
                  style={{ fontSize: "14px", fontWeight: "500", color: "red" }}
                >
                  {userData.phone}
                </div>
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
                    backgroundColor: "#8ba889",
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
            <h8 style={{ fontWeight: "800" }}>
              2. {t("Customer_Shopping_Payment.6")}
            </h8>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "#253528",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "500" }}>
                {t("Customer_Shopping_Payment.21")}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                }}
              >
                <Button
                  size="small"
                  style={{
                    marginRight: "10px",
                    backgroundColor: "#8ba889",
                    fontWeight: "700",
                    color: "white",
                  }}
                  onClick={handleOpenAddressFormClick}
                >
                  {t("Customer_Shopping_Payment.22")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ display: `${hideAddressForm}` }}>
        <Zoom>
          <AddressInputForm
            display={hideAddressForm}
            onClick={(hideAddressForm) =>
              handleOpenAddressFormClick(hideAddressForm)
            }
            name={fullName ? userData.fullName : fullName}
            phone={fullName ? userData.phone : ""}
            provinceId={fullName ? userData.provinceId : "0"}
            districtId={fullName ? userData.districtId : "0"}
            wardId={fullName ? userData.wardId : "0"}
            specificAddress={fullName ? userData.specificAddress : ""}
            id={id}
            props={props}
            tag="1"
          />
        </Zoom>
      </div>
    </div>
  );
};
export default withRouter(HeaderinPayment);
