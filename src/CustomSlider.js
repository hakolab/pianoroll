import React from 'react'
import { Slider } from '@material-ui/core'
import { connect } from 'react-redux'

class CustomSlider extends React.Component {
    render(){
        const value = this.props.value
        return(
            <Slider
            id={this.props.id}
            step={this.props.step}
            max={this.props.max}
            onChange={this.props.onChange}
            value={value}/>
        )
    }
}

CustomSlider = connect((state) => state)(CustomSlider)
export default CustomSlider