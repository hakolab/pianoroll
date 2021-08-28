import { makeStyles } from "@material-ui/core"

export const useSliderStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('spPortrait')]: {
      height: "50px"
    },
    [theme.breakpoints.up('spLandscape')]: {
      height: "60px"
    },
  },
  icon: {
    color: theme.palette.primary.dark,
    height: "40px",
    lineHeight: "40px"
  },
  iconRotate: {
    transform: "rotate(90deg)"
  },
  disabled: {
    color: theme.palette.action.disabled,
  }
}))