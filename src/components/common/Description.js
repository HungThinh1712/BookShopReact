import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';




const useStyles = makeStyles((theme) => ({

    
      paragraph: {
        [theme.breakpoints.up('sm')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'30px',
        },
        [theme.breakpoints.up('lg')]: {
          marginLeft:'87px', marginRight:'87px',wordWrap:'break-word',marginTop:'10px'
          },
        [theme.breakpoints.down('xs')]: {
          marginLeft:'0px',
          marginRight:'0px',
          marginTop:'30px',
        },
      },
         
}));


const Description = () => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paragraph}>
                <p style ={{height:'50%',padding:'10px'}}>Point and purpose is the key to understanding types of paragraphs and kinds of paragraphs.
In writing, the words point and purpose are almost synonymous. Your point is your purpose, and how you decide to make your point clear to your reader is also your purpose. Writers have a point and a purpose for every paragraph that they create.
Writers write descriptive paragraphs because their purpose is to describe something. Their point is that something is beautiful or disgusting or strangely intriguing. Writers write persuasive and argument paragraphs because their purpose is to persuade or convince someone. Their point is that their reader should see things a particular way and possibly take action on that new way of seeing things. Writers write paragraphs of comparison because the comparison will make their point clear to their readers.
The purpose of Pattern Based Writing: Quick & Easy Essay is to quickly and easily teach students how to organize information and make points clear. Then in the Writing with Purpose section of the writing program, students learn to apply their new writing strategies to different types, kinds, genres, and modes of writing. The truth is that it’s quick and easy to get students to write many different types of paragraphs when they have the right foundation.</p>
                </Paper>
        </div>
    );
};

export default Description;