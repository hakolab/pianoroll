import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import clsx from 'clsx'
import Button from '@material-ui/core/Button';
import { DialogPresenter } from './DialogPresenter'
import { useButtonStyles } from "../../hooks/useButtonStyles";

export const ConfirmDialogContainer = ({open, title, text, onClose, onClickOk}) => {
  const classes = useButtonStyles();

  const handleClickNo = () => {
    onClose();
  };

  const handleClickOk = () => {
    onClickOk();
    onClose();
  }

  return (
    <DialogPresenter
      open={open}
      title={title}
      text={text}
      onClose={handleClickNo}
    >
      <Fragment>
        <Button onClick={handleClickOk} className={clsx(classes.confirmButton, classes.safeColor)}>
          YES
        </Button>
        <Button onClick={handleClickNo} className={clsx(classes.confirmButton, classes.dangerColor)}>
          NO
        </Button>
      </Fragment>
    </DialogPresenter>
  )
}

ConfirmDialogContainer.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onClickOk: PropTypes.func.isRequired
};