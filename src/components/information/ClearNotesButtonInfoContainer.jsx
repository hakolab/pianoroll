import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ClearNotesButtonContainer } from '../buttons/ClearNotesButtonContainer'

export const ClearNotesButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"入力した音符をクリアします。"}
    >
      <ClearNotesButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}