import React from "react";
import Button from '@material-ui/core/Button';
import { DialogPresenter } from './DialogPresenter'
import PropTypes from 'prop-types';

export const AlertDialogContainer = ({open, title, text, onClose}) => {
  return (
    <DialogPresenter
      open={open}
      title={title}
      text={text}
      onClose={onClose}
    >
      <Button onClick={onClose} color="primary">
        OK
      </Button>
    </DialogPresenter>
  )
}

AlertDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};