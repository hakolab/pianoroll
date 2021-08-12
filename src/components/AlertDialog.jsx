import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from './Dialog'
import PropTypes from 'prop-types';

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default function AlertDialog({open, title, text, onClose}){

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      title={title}
      text={text}
      onClose={handleClose}
    >
      <Button onClick={handleClose} color="primary">
        OK
      </Button>
    </Dialog>
  )
}