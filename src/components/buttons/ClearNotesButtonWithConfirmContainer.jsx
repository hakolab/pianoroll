import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { ConfirmDialogContainer } from '../dialogs/ConfirmDialogContainer'
import { useDialogState } from '../../hooks/useDialogState';
import { ClearNotesButtonContainer } from './ClearNotesButtonContainer';

export const ClearNotesButtonWithConfirmContainer = ({action, isPlaying = false}) => {
  // clear確認
  const [isOpenConfirmClear, confirmClearDispatcher] = useDialogState(false);

  return (
    <Fragment>
      <ClearNotesButtonContainer
        action={confirmClearDispatcher.open}
        isPlaying={isPlaying}
      >
        <FontAwesomeIcon icon={faEraser}/>
      </ClearNotesButtonContainer>
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

ClearNotesButtonWithConfirmContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}