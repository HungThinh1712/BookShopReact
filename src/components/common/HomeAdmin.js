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
import {withRouter} from 'react-router-dom'

const useStyles = makeStyles(styles);

const HomeAdmin = (props) => {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
            <div style={{cursor:'pointer'}} onClick={()=>props.history.push('/admin')}>
                <CardIcon color="info">
                    <HomeIcon />
                </CardIcon>
            </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/books")}>
                <CardIcon color="warning">
                    <ImportContactsIcon />
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/customer_page")}>
                <CardIcon color="success">
                    <PeopleIcon />
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/usermanagement_page")}>
                <CardIcon color="rose">
                    <AccountCircleIcon />
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/typemanagement_page")}>
                <CardIcon color="danger">
                    <MenuBookIcon />
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/ordermanagement_page")}>
                <CardIcon color="success">
                    <ShoppingCartIcon />
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/pulishinghousemanagement_page")}>
                <CardIcon color="danger">
                    <HomeWorkIcon/>
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/authormanagement_page")}>
                <CardIcon color="info">
                    <AccountBoxIcon/>
                </CardIcon>
                </div>
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
                <div style={{cursor:'pointer'}} onClick={()=>props.history.push("/admin/report_page")}>
                <CardIcon color="primary">
                    <EqualizerIcon/>
                </CardIcon>
                </div>
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

export default withRouter(HomeAdmin);