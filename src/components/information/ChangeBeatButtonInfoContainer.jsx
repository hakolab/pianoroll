import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ChangeBeatButtonContainer } from '../buttons/ChangeBeatButtonContainer'

export const ChangeBeatButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"拍子を変更します。"}
      width={100}
    >
      <ChangeBeatButtonContainer
        target={{viewName: "beat mode"}}
        beatObject={{mode: "beat mode"}}
        isInfo={true}
      /> 
    </InformationItemPresenter>
  )
}