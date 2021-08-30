import React from 'react'
import { InformationItemPresenter } from './InformationItemPresenter'
import { ChangeNumberOfBarsSliderContainer } from '../sliders/ChangeNumberOfBarsSliderContainer'

export const ChangeNumberOfBarsSliderInfoContainer = () => {
  return (
    <InformationItemPresenter
      description={"テンポを変更します。"}
      width={120}
    >
      <ChangeNumberOfBarsSliderContainer
        value={4}
        showLabel={false}
        isInfo={true}
      /> 
    </InformationItemPresenter>
  )
}