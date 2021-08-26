import React from "react";
import { Dialog as MuiDialog } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

export const DialogPresenter = ({open, title, text, children, onClose}) => {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {children}
      </DialogActions>
    </MuiDialog>
  )
}

DialogPresenter.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.element,
  onClose: PropTypes.func
};