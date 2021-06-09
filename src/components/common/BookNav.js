import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EngIcon from '../Images/En.png';
import VNIcon from '../Images/Vn.png';
import NavVnese from '../Images/NavVnese.png' 
const useStyles = makeStyles((theme) => ({


	root: {
	 
	  [theme.breakpoints.down('sm')]: {
		marginLeft:'0px',
		marginRight:'0px',
		marginTop: '90px',
	  },
	  [theme.breakpoints.down('md')]: {
		marginLeft:'0px',
		marginRight:'0px',
		marginTop: '90px',
	  },
	  [theme.breakpoints.up('lg')]: {
		marginLeft:'87px',
		marginRight:'87px',
	  },
	  [theme.breakpoints.down('xs')]: {
		marginLeft:'0px',
		marginRight:'0px',
		fontSize:'20px',
		marginTop: '90px',
	  },
	},
	all_book: {
		[theme.breakpoints.down('xs')]: {
		 display:'none'
		},
	  },
	  

  }));

export default function VietNameseBookNav(props) {
	const classes = useStyles();

        return (
                <div style={{display:'flex',alignItems:'center',borderRadius:'5px 5px 0 0',justifyContent:'center'}}  className = {`home-header ${classes.root}`} >
					{props.type==="EN" ? <img src={EngIcon} style={{paddingTop:'1px',color:'#114b5f',marginLeft:'10px',marginRight:"2px",width:"50px",height:"50px"}} fontSize="large" ></img>: <img src={VNIcon} style={{paddingTop:'1px',color:'#114b5f',marginLeft:'10px',marginRight:"2px",width:"50px",height:"50px"}} fontSize="large" ></img>}
		            <h2 style={{paddingTop:"12px",fontSize:'20px',fontWeight:'550',textTransform:'uppercase',color:'#114b5f',fontFamily:"Gagalin"}}>{props.title}</h2>
					
		        </div>
        );
}
