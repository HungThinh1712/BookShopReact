import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paragraph: {
    backgroundColor: "#dae6d6 ",
    color: "#114b5f",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "30px",
    },
    [theme.breakpoints.up("lg")]: {
      marginLeft: "87px",
      marginRight: "87px",
      wordWrap: "break-word",
      marginTop: "10px",
    },
    [theme.breakpoints.down("xs")]: {
      marginLeft: "0px",
      marginRight: "0px",
      marginTop: "30px",
    },
  },
}));

const Description = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paragraph}>
        <p style={{ height: "50%", padding: "10px", fontWeight: "600" }}>
          {props.description}
        </p>
      </Paper>
    </div>
  );
};

export default Description;
