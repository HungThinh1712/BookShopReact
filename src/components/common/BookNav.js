import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
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
                <div style={{display:'flex'}}  className = {`home-header ${classes.root}`} >
					<LibraryBooksIcon style={{paddingTop:'1px',color:'#FFFFFF',marginLeft:'10px',marginRight:"10px"}} fontSize="large" ></LibraryBooksIcon>
		            <h2 style={{paddingTop:'1px',fontSize:'20px',fontWeight:'550',textTransform:'uppercase',paddingTop:"8px",color:'#FFFFFF'}}>{props.title}</h2>
					
		        </div>
        );
}
