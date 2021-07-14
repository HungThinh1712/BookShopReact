// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Stepper from "@material-ui/core/Stepper";
// import Step from "@material-ui/core/Step";
// import StepLabel from "@material-ui/core/StepLabel";
// import { useTranslation } from "react-i18next";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "70%",
//     backgroundColor: "#114b5f",
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//   },
//   icon: {
//     color: theme.palette.secondary.main,
//     "&$activeIcon": {
//       color: theme.palette.secondary.main,
//     },
//     "&$completedIcon": {
//       color: theme.palette.secondary.main,
//     },
//   },
// }));

// export default function HorizontalLinearStepper(props) {
//   const { t } = useTranslation();
//   function getSteps() {
//     return [
//       t("Customer_Management.45"),
//       t("Customer_Management.16"),
//       t("Customer_Shopping_Payment.11"),
//     ];
//   }
//   const classes = useStyles();
//   const [activeStep] = React.useState(props.step ? props.step : 1);
//   const steps = getSteps();
//   return (
//     <div className={classes.root}>
//       <Stepper style={{ background: "#114b5f" }} activeStep={activeStep}>
//         {steps.map((label, index) => {
//           const stepProps = {};
//           const labelProps = {};

//           return (
//             <Step style={{ color: "#88d498" }} key={label} {...stepProps}>
//               <StepLabel
//                 {...labelProps}
//                 StepIconProps={{
//                   classes: {
//                     root: classes.icon,
//                     active: classes.activeIcon,
//                     completed: classes.completedIcon,
//                   },
//                 }}
//               >
//                 <span style={{ color: "#88d498" }}>{label}</span>
//               </StepLabel>
//             </Step>
//           );
//         })}
//       </Stepper>
//     </div>
//   );
// }

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";

const styles = (theme) => ({
  root: {
    width: "70%",
    backgroundColor: "#114b5f",
  },
  icon: {
    color: "#88d498",
    "&$activeIcon": {
      color: "#88d498",
    },
    "&$completedIcon": {
      color: "#88d498",
    },
  },
  activeIcon: {},
  completedIcon: {},
});

function getSteps() {
  return ["Đăng nhập", "Địa chỉ giao hàng", "Thanh toán"];
}

class HorizontalLinearStepper extends React.Component {
  state = {
    activeStep: 1,
    skipped: new Set(),
  };

  render() {
    const { classes } = this.props;
    console.log(this.props);
    const steps = getSteps();
    const activeStep = this.props.step;

    return (
      <div
        className={classes.root}
        style={{ backgroundColor: "#114b5f !important" }}
      >
        <Stepper style={{ background: "#114b5f" }} activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel
                  {...labelProps}
                  StepIconProps={{
                    classes: {
                      root: classes.icon,
                      active: classes.activeIcon,
                      completed: classes.completedIcon,
                    },
                  }}
                >
                  <span style={{ color: "#88d498" }}>{label}</span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </div>
    );
  }
}

export default withStyles(styles)(HorizontalLinearStepper);
