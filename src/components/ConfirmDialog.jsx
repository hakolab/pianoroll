import React, { Fragment } from "react";
import Button from '@material-ui/core/Button';
import Dialog from './Dialog'
import PropTypes from 'prop-types';
import { useButtonStyles } from "../hooks/useButtonStyles";

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickOk: PropTypes.func.isRequired
};

export default function ConfirmDialog({open, title, text, onClose, onClickOk}){
  const classes = useButtonStyles();

  const handleClickNo = () => {
    onClose();
  };

  const handleClickOk = () => {
    onClickOk();
    onClose();
  }

  return (
    <Dialog
      open={open}
      title={title}
      text={text}
      onClose={handleClickNo}
    >
      <Fragment>
        <Button onClick={handleClickNo} className={classes.dangerColor}>
          NO
        </Button>
        <Button onClick={handleClickOk} className={classes.ok}>
          OK
        </Button>
      </Fragment>
    </Dialog>
  )
}