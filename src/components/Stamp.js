import React from 'react'
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
import Palette from './Palette'

const area = {
    width: "500px",
    height: "500px",
    margin: "20px 0px",
    border: "1px solid blue",
}

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

    const fnChangeWidth = (event, newValue) => {
        dispatch(changeWidth(newValue))
    }

    const fnChangeHeight = (event, newValue) => {
        dispatch(changeHeight(newValue))
    }

    const stampPicture = stampList.map((value) => draw(value))

    return(
        <div>
            <h1>React</h1>
            <div style={area} onClick={(event) => dispatch(add({x: event.pageX, y: event.pageY}))}>
                {stampPicture}
            </div>
            <Palette 
                confWidth={confWidth}
                confHeight={confHeight}
                onChangeWidth={fnChangeWidth}
                onChangeHeight={fnChangeHeight}
            />
            <div style={preview}></div>
        </div>
    )
}