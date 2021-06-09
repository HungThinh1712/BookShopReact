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
                <div style={{display:'flex',alignItems:'center',borderRadius:'5px 5px 0 0',justifyContent:'center'}}  className = {`home-header ${classes.root}`} >
					<LibraryBooksIcon style={{paddingTop:'1px',color:'#114b5f',marginLeft:'10px',marginRight:"10px"}} fontSize="large" ></LibraryBooksIcon>
		            <h2 style={{paddingTop:"12px",fontSize:'20px',fontWeight:'550',textTransform:'uppercase',color:'#114b5f'}}>{props.title}</h2>
					
		        </div>
        );
}
