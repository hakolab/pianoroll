import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ChangeBpmSliderContainer } from '../sliders/ChangeBpmSliderContainer'

export const ChangeBpmSliderInfoContainer = () => {

  return (
    <InformationItemPresenter
      description={"テンポを変更します。"}
      width={120}
    >
      <ChangeBpmSliderContainer
        value={120}
        showLabel={false}
        isInfo={true}
      /> 
    </InformationItemPresenter>
  )
}