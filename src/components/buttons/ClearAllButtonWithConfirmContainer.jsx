import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { ConfirmDialogContainer } from '../dialogs/ConfirmDialogContainer'
import { useDialogState } from '../../hooks/useDialogState';
import { ClearAllButtonContainer } from './ClearAllButtonContainer';

export const ClearAllButtonWithConfirmContainer = ({action, isPlaying = false}) => {
  // allClear確認
  const [isOpenConfirmAllClear, confirmAllClearDispatcher] = useDialogState(false);

  return (
    <Fragment>
      <ClearAllButtonContainer
        action={confirmAllClearDispatcher.open}
        isPlaying={isPlaying}
      >
        <FontAwesomeIcon icon={faEraser}/>
      </ClearAllButtonContainer>
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

ClearAllButtonWithConfirmContainer.propTypes = {
  action: PropTypes.func,
  isPlaying: PropTypes.bool
}