import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

	root: {
	 
	  [theme.breakpoints.up('sm')]: {
		marginLeft:'0px',
        marginRight:'0px',
	  },
	  [theme.breakpoints.up('lg')]: {
		marginLeft:'87px',
		marginRight:'87px',
	  },
	  [theme.breakpoints.down('xs')]: {
		marginLeft:'0px',
		marginRight:'0px',
		fontSize:'20px'
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
                <div className = {`home-header ${classes.root}`} >
		            <h2 >
					<a >{props.title}</a>
		            </h2>
		        </div>
        );
}
