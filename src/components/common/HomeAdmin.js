import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "./GridItem";
import GridContainer from "./GridContainer";
import Card from "./Card_Admin";
import CardHeader from "./CardHeader";
import CardIcon from "./CardIcon";
import CardFooter from "./CardFooter";
import HomeIcon from '@material-ui/icons/Home';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import styles from "../../styles/dashboardStyle";

const useStyles = makeStyles(styles);

function HomeAdmin() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
            <a href="/admin">
                <CardIcon color="info">
                    <HomeIcon />
                </CardIcon>
            </a>
              <p className={classes.cardCategory}>TRANG CHỦ</p>
              <h3 className={classes.cardTitle}>HOME</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
                <a href="/admin/books">
                <CardIcon color="warning">
                    <ImportContactsIcon />
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h3 className={classes.cardTitle}>
                SÁCH
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
                <a href="/admin/customer_page">
                <CardIcon color="success">
                    <PeopleIcon />
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h4 className={classes.cardTitle}>KHÁCH HÀNG</h4>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
      <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="rose" stats icon>
                <a href="/admin/usermanagement_page">
                <CardIcon color="rose">
                    <AccountCircleIcon />
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h3 className={classes.cardTitle}>TÀI KHOẢN</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
                <a href="/admin/typemanagement_page">
                <CardIcon color="danger">
                    <MenuBookIcon />
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h3 className={classes.cardTitle}>
                LOẠI SÁCH
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
                <a href="/admin/ordermanagement_page">
                <CardIcon color="success">
                    <ShoppingCartIcon />
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h3 className={classes.cardTitle}>ĐƠN HÀNG</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
      <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="danger" stats icon>
                <a href="/admin/pulishinghousemanagement_page">
                <CardIcon color="danger">
                    <HomeWorkIcon/>
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h3 className={classes.cardTitle}>NXB</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
                <a href="/admin/authormanagement_page">
                <CardIcon color="info">
                    <AccountBoxIcon/>
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>QUẢN LÝ</p>
              <h3 className={classes.cardTitle}>TÁC GIẢ</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
                <a href="/admin/report_page">
                <CardIcon color="primary">
                    <EqualizerIcon/>
                </CardIcon>
                </a>
              <p className={classes.cardCategory}>THỐNG KÊ</p>
              <h3 className={classes.cardTitle}>CHI TIẾT</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default HomeAdmin;