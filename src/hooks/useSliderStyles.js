import { makeStyles } from "@material-ui/core"

export const useSliderStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      height: "50px"
    },
    [theme.breakpoints.up('sm')]: {
      height: "60px"
    },
  },
  icon: {
    color: theme.palette.text.primary,
    height: "40px",
    lineHeight: "40px"
  },
  iconRotate: {
    transform: "rotate(90deg)"
  },
  disabled: {
    color: theme.palette.action.disabled,
  },
}))