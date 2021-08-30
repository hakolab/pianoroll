import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ZoomOutButtonContainer } from '../buttons/ZoomOutButtonContainer'

export const ZoomOutButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"鍵盤、グリッドを縮小して表示します。"}
    >
      <ZoomOutButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}