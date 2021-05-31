import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

export default function FlashSaleNav(props) {
	const classes = useStyles();
        return (
                <div className = {`home-header ${classes.root}`} >
		            <h2 >
					<p >Flash sale</p>
		            </h2>
		        </div>
        );
}
