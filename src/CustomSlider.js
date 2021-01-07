import React from 'react'
import { Slider } from '@material-ui/core'
import { connect } from 'react-redux'

function CustomSlider(props){
    return(
        <Slider 
        step={1}
        max={50}
        onChange={props.onChange}
        value={props.value}/>
    )
}

CustomSlider = connect((state) => state)(CustomSlider)
export default CustomSlider