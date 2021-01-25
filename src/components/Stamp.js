import React from 'react'
import Palette from './Palette'
import Canvas from './Canvas'
import * as stampConfSelectors from '../redux/ducks/stamp/conf/selectors'
import { createSelector } from 'reselect'
import { getPreview } from '../redux/ducks/stamp/utils'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

export function Stamp(){

    const confWidth = useSelector(stampConfSelectors.selectConfWidth)
    const confHeight = useSelector(stampConfSelectors.selectConfHeight)

    return(
        <div>
            <h1>React</h1>
            <Canvas />
            <Palette confWidth={confWidth} confHeight={confHeight}
            />
            
        </div>
    )
}