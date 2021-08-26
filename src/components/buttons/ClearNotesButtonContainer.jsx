import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { ConfirmDialogContainer } from '../dialogs/ConfirmDialogContainer'
import { useDialogState } from '../../hooks/useDialogState';
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ClearNotesButtonContainer = ({action, isPlaying = false}) => {
  const classes = useButtonStyles();
  // clear確認
  const [isOpenConfirmClear, confirmClearDispatcher] = useDialogState(false);

  return (
    <Fragment>
      <ButtonPresenter
        onClick={confirmClearDispatcher.open}
        disabled={isPlaying}
        optionalClass={classes.dangerHover}
      >
        <FontAwesomeIcon icon={faEraser}/>
      </ButtonPresenter>
      <ConfirmDialogContainer
        open={isOpenConfirmClear}
        title={"CLEAR"}
        text={"入力した音符をすべてクリアします。よろしいですか？"}
        onClose={confirmClearDispatcher.close}
        onClickOk={action}
      />
    </Fragment>
  )
}

ClearNotesButtonContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}