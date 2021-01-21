import React from 'react'
import { Grid, Slider, Typography} from '@material-ui/core'

export default function Palette(props){
    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <Typography>width: {props.confWidth.value}</Typography>
                <Typography>step: {props.confWidth.step}</Typography>
                <Typography>max: {props.confWidth.max}</Typography>
                <Slider
                    onChange={(event, newValue) => props.onChangeWidth(event, newValue)}
                    value={props.confWidth.value} 
                    step={props.confWidth.step}
                    max={props.confWidth.max}
                />
            </Grid>
            <Grid item xs={6}>
                <Typography>height: {props.confHeight.value}</Typography>
                <Typography>step: {props.confHeight.step}</Typography>
                <Typography>max: {props.confHeight.max}</Typography>
                <Slider
                    onChange={(event, newValue) => props.onChangeHeight(event, newValue)}
                    value={props.confHeight.value}
                    step={props.confHeight.step}
                    max={props.confHeight.max}
                />
            </Grid>
        </Grid>
    )
}