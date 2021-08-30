import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ClearAllButtonContainer } from '../buttons/ClearAllButtonContainer'

export const ClearAllButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"入力した音符やキーボードモード、テンポなどをすべてクリアします。"}
    >
      <ClearAllButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}