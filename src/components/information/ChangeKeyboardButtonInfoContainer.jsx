import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ChangeKeyboardButtonContainer } from '../buttons/ChangeKeyboardButtonContainer'

export const ChangeKeyboardButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"キーボードモードを変更します。"}
      width={100}
    >
      <ChangeKeyboardButtonContainer
        target={{viewName: "keyboard mode"}}
        keyboardObject={{mode: "keyboard mode"}}
        isInfo={true}
      />
    </InformationItemPresenter>
  )
}