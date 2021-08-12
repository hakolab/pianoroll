import React, { Fragment } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { useButtonStyles } from '../hooks/useButtonStyles';

AlertDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  confirm: PropTypes.bool,
  onClickNo: PropTypes.func,
  onClickOk: PropTypes.func
};

export default function AlertDialog({open, title, text, confirm, onClickNo, onClickOk}){
  const classes = useButtonStyles();

  const handleClose = (answer) => {
    if(answer){
      onClickOk()
      return
    }
    onClickNo();
  };

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {
          confirm
          ? <Fragment>
              <Button onClick={() => handleClose(false)} className={classes.dangerColor}>
                NO
              </Button>
              <Button onClick={() => handleClose(true)} className={classes.ok}>
                OK
              </Button>
            </Fragment>
          : <Button onClick={() => handleClose(true)} color="primary">
              OK
            </Button>
        }
      </DialogActions>
    </Dialog>
  )
}