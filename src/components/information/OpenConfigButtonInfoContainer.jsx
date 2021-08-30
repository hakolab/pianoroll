import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { OpenConfigButtonContainer } from '../buttons/OpenConfigButtonContainer'

export const OpenConfigButtonInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"設定ウインドウを開きます。"}
    >
      <OpenConfigButtonContainer isInfo={true}/>
    </InformationItemPresenter>
  )
}