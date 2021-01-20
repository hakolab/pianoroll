import { Grid, Slider, Box, } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    add,
} from '../redux/ducks/stamp/list/slice'
import {
    changeWidth,
    changeHeight,
} from '../redux/ducks/stamp/conf/slice'
import * as stampListSelectors from '../redux/ducks/stamp/list/selectors'
import * as stampConfSelectors from '../redux/ducks/stamp/conf/selectors'
import Typography from '@material-ui/core/Typography'
import Measure from 'react-measure'

const area = {
    width: "500px",
    height: "500px",
    margin: "20px 0px",
    border: "1px solid blue",
}
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
    root: {
      color: '#3880ff',
      height: 2,
      padding: '15px 0',
    },
    thumb: {
      height: 28,
      width: 28,
      backgroundColor: '#fff',
      boxShadow: iOSBoxShadow,
      marginTop: -14,
      marginLeft: -14,
      '&:focus, &:hover, &$active': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 12px)',
      top: -22,
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    track: {
      height: 2,
    },
    rail: {
      height: 2,
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    mark: {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      marginTop: -3,
    },
    markActive: {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  })(Slider);

  const marks = [
    {
      value: 0,
    },
    {
      value: 20,
    },
    {
      value: 37,
    },
    {
      value: 100,
    },
  ];

export function Stamp(){
    const stampList = useSelector(stampListSelectors.selectStampList)
    const confWidth = useSelector(stampConfSelectors.selectConfWidth)
    const confHeight = useSelector(stampConfSelectors.selectConfHeight)
    const preview = useSelector(stampConfSelectors.selectConfForPreview)
    const dispatch = useDispatch()

    function draw(d){
        let s = {
            position: "absolute",
            left: (d.x - 25) + "px",
            top: (d.y -25) + "px",
            width: "50px",
            height: "50px",
            backgroundColor: "#66f3",
        }

        return <div style={s}></div>
    }

    const stampPicture = stampList.map((value) => draw(value))

    const [dimensions, setDimensions] = useState({width: 50, height: 50})

    return(
        <div>
            <h1>React</h1>
            <div style={area} onClick={(event) => dispatch(add({x: event.pageX, y: event.pageY}))}>
                {stampPicture}
            </div>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography>width: {confWidth.value}</Typography>
                    <Typography>step: {confWidth.step}</Typography>
                    <Typography>max: {confWidth.max}</Typography>
                    <Slider
                        onChange={(event, newValue) => dispatch(changeWidth(newValue))}
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
                        onChange={(event, newValue) => dispatch(changeHeight(newValue))}
                        value={confHeight.value}
                        step={confHeight.step}
                        max={confHeight.max}
                    />
                </Grid>
            </Grid>
            <div style={preview}></div>
            <Measure bounds onResize={contentRect => {setDimensions(contentRect.bounds)}}>
                {({measureRef}) =>(
                    <Box ref={measureRef} bgcolor="blue">{dimensions.width}:{dimensions.height}</Box>
                )}
            </Measure>
            <IOSSlider aria-label="ios slider" defaultValue={60} />
        </div>
    )
}