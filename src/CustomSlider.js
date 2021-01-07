import React from 'react'
import { Slider } from '@material-ui/core'
import { connect } from 'react-redux'

function CustomSlider(props){
    return(
        <Slider
        id={props.id}
        step={props.step}
        max={props.max}
        onChange={props.onChange}
        value={props.value}/>
    )
}

CustomSlider = connect((state) => state)(CustomSlider)
export default CustomSlider