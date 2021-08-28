import React from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx'
import Button from '@material-ui/core/Button';
import { DialogPresenter } from './DialogPresenter'
import { useButtonStyles } from "../../hooks/useButtonStyles";

export const AlertDialogContainer = ({open, title, text, onClose}) => {
  const classes = useButtonStyles();

  return (
    <DialogPresenter
      open={open}
      title={title}
      text={text}
      onClose={onClose}
    >
      <Button onClick={onClose} className={clsx(classes.confirmButton, classes.dark)}>
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