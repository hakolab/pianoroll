import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { PlayButtonContainer } from '../buttons/PlayButtonContainer'

export const PlayButtonInfoContainer = () => {
  return (
    <InformationItemPresenter 
      description={"シーケンサーを動かして、演奏を始めます。"}
    >
      <PlayButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}