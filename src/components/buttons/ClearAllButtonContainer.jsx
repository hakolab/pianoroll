import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ButtonPresenter } from './ButtonPresenter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDialogState } from '../../hooks/useDialogState';
import { ConfirmDialogContainer } from '../dialogs/ConfirmDialogContainer';
import { useButtonStyles } from '../../hooks/useButtonStyles';

export const ClearAllButtonContainer = ({action, isPlaying = false}) => {
  const classes = useButtonStyles();
  // allClear確認
  const [isOpenConfirmAllClear, confirmAllClearDispatcher] = useDialogState(false);

  return (
    <Fragment>
      <ButtonPresenter
        onClick={confirmAllClearDispatcher.open}
        disabled={isPlaying}
        optionalClass={classes.dangerHover}
      >
        <FontAwesomeIcon icon={faTrashAlt}/>
      </ButtonPresenter>
      <ConfirmDialogContainer
        open={isOpenConfirmAllClear}
        title={"ALL CLEAR"}
        text={"キーボードモード、拍子、小節数、入力した音符などをすべてクリアします。よろしいですか？"}
        onClose={confirmAllClearDispatcher.close}
        onClickOk={action}
      />
    </Fragment>
  )
}

ClearAllButtonContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}