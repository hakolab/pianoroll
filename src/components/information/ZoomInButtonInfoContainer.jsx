import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ZoomInButtonContainer } from '../buttons/ZoomInButtonContainer'

export const ZoomInButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"鍵盤、グリッドを拡大して表示します。"}
    >
      <ZoomInButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}