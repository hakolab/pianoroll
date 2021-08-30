import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { StopButtonContainer } from '../buttons/StopButtonContainer'

export const StopButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"シーケンサーを止めて、演奏を終了します。"}
    >
      <StopButtonContainer isPlaying={true} isInfo={true}/>
    </InformationItemPresenter>
  )
}