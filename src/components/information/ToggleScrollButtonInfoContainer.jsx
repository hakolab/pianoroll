import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ToggleScrollButtonContainer } from '../buttons/ToggleScrollButtonContainer'

export const ToggleScrollButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"グリッド内でスワイプするとスクロールができるようになります。"}
    >
      <ToggleScrollButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}