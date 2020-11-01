import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Logo from './../Images/logo_hcmute.png'
import MenuIcon from '@material-ui/icons/Menu'
import { withRouter } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import SnackBar from '../common/SnackBarLoginSuccess'
const useStyles = makeStyles((theme) => ({

  grow: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: '#8470FF',
    
  },
  toolBar: {
    
    [theme.breakpoints.up('sm')]: {
      marginRight:'0px',
      marginLeft:'0px',
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft:'80px',
      marginRight:'50px'
    },
    
    [theme.breakpoints.down('xs')]: {
      marginRight:'0px',
      marginLeft:'0px',
    },

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    textTransform:'uppercase',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontSize: '40px',
    fontWeight : '700',
    cursor: 'pointer',
    fontFamily: 'Righteous'
  },
  logo: {
    display: 'block',
    maxWidth:'5%',
    cursor: 'pointer',
  },
  search: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '50%',
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    height:'35px',
    marginLeft: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
        width: '80ch',
    },
    
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    pointerEvents: 'none',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color:'black',
  },
  inputRoot: {
    color: 'black',
    marginLeft: '10px',
    flex: 26,
    [theme.breakpoints.up('sm')]: {
        width: '80ch',
    },
    
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  menuIcon: {
    
    [theme.breakpoints.up('sm')]: {

        display:'inline-block',
        border: 'none',
        outlineStyle:'none'
      },
      [theme.breakpoints.up('lg')]: {
        display:'none',
        marginLeft:'87px',
        marginTop:'100px'
      },
      [theme.breakpoints.down('xs')]: {
        display:'inline-block',
        border: 'none',
        outlineStyle:'none'
      },
  },
}));

const  PrimarySearchAppBar = (props) => {
  const classes = useStyles();

  const [openSnackBar, setopenSnackBar] = React.useState(false);

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const cartAmount = useSelector(state => state.cart.items ? Object.keys(state.cart.items).length : null);
 
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div  >
      <AppBar className={classes.appBar} >
        <Toolbar className={classes.toolBar}>
          <IconButton className ={classes.menuIcon} aria-label="show 4 new mails" color="inherit">
              <MenuIcon />
          </IconButton>
           <img  className={classes.logo} src={Logo} alt=""/>
           <div style= {{flexGrow:'0.04'}}></div>
          <Typography className={classes.title} variant="h6" noWrap>
            Tina
          </Typography>
          <div className={classes.search}>
            
            <InputBase
              placeholder="Tìm kiếm sản phẩm..."
              classes={{
                root: classes.inputRoot,
              }}
            />
            <IconButton  onClick={() => props.history.push("/search")}  >
                <SearchIcon />
              </IconButton>
          </div>
          <div style= {{flexGrow:'1'}}></div>
         
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <div style= {{flexGrow: 0.3}}></div>
            <IconButton    color="inherit" onClick={() => props.history.push("/login")}>            
                < AccountCircle/>
            </IconButton>
            <IconButton onClick={() => props.history.push("/cart")} style={{ outline: 'none !important',boxShadow: 'none'}} color ="inherit"            
            >
              <Badge badgeContent={cartAmount} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <SnackBar
      
      />
    </div>
  );
}
export default withRouter( PrimarySearchAppBar );