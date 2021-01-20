import React from 'react'
import { Slider, Typography, useTheme, useMediaQuery } from '@material-ui/core'
import { selectConfHeight, selectConfWidth } from '../redux/ducks/stamp/conf/selectors' 
import { useSelector } from 'react-redux'

export default function CustomSlider(props){
    const confHeight = useSelector(selectConfHeight)
    return (
        <div>
            <Typography>height: {confHeight.value}</Typography>
            <Typography>step: {confHeight.step}</Typography>
            <Typography>max: {confHeight.max}</Typography>
            <Slider
                onChange={confHeight.onChange}
                value={confHeight.value}
                step={confHeight.step}
                max={confHeight.max}
            />
        </div>
    )
}