import React, { Fragment } from 'react'
import { Grid, Slider, Typography} from '@material-ui/core'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
    changeWidth,
    changeHeight,
} from '../redux/ducks/stamp/conf/slice'
import * as stampConfSelectors from '../redux/ducks/stamp/conf/selectors'
import { createSelector } from 'reselect'
import { getPreview } from '../redux/ducks/stamp/utils'

export default function Palette(props){
    console.log('palette rendered')

    /* const selectConfWidthWithCreator = createSelector(
        [stampConfSelectors.selectConfWidth],
        (width) => {
            return width
        }
    )

    const selectConfWidthHeightCreator = createSelector(
        [stampConfSelectors.selectConfHeight],
        (height) => {
            return height
        }
    ) */

    /* const selectConfPreview = createSelector(
        [stampConfSelectors.selectConf],
        (preview) => {
            return preview
        }
    ) */

    const confWidth = useSelector(stampConfSelectors.selectConfWidth)
    const confHeight = useSelector(stampConfSelectors.selectConfHeight)
    const preview = useSelector(stampConfSelectors.selectConf)
    const dispatch = useDispatch()

    const fnChangeWidth = (event, newValue) => {
        dispatch(changeWidth(newValue))
    }

    const fnChangeHeight = (event, newValue) => {
        dispatch(changeHeight(newValue))
    }

    return (
        <Fragment>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography>width: {confWidth.value}</Typography>
                    <Typography>step: {confWidth.step}</Typography>
                    <Typography>max: {confWidth.max}</Typography>
                    <Slider
                        onChange={(event, newValue) => fnChangeWidth(event, newValue)}
                        value={confWidth.value} 
                        step={confWidth.step}
                        max={confWidth.max}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Typography>height: {confHeight.value}</Typography>
                    <Typography>step: {confHeight.step}</Typography>
                    <Typography>max: {confHeight.max}</Typography>
                    <Slider
                        onChange={(event, newValue) => fnChangeHeight(event, newValue)}
                        value={confHeight.value}
                        step={confHeight.step}
                        max={confHeight.max}
                    />
                </Grid>
            </Grid>
            <div style={getPreview(preview)}></div>
        </Fragment>
    )
}