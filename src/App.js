import React, { Fragment, useEffect, useRef } from 'react'
import { Box } from '@material-ui/core'
import { Hue } from 'react-color-palette/lib/components/Hue'
import { useColor } from 'react-color-palette'

export default function App(){

    const [color, setColor] = useColor("hex", "#121212");

    return (
        <Box width="456px" height="50px">
            <p>test</p>
            <TouchableHue width={456} color={color} onChange={setColor} />
        </Box>
    )
}

const TouchableHue = (props) => {

    const touchableHueRef = useRef(null)

    const dummyRef = useRef(null)

    const handleClick = (event) => {
        console.log('onClick!')
        console.log(event)
    }

    return (
        <Fragment>
            <Box
                ref={touchableHueRef}
                onTouchStart={(e) => touchStartToMouseDown(e)}
                onTouchMove={(e) => touchMoveToMouseMove(e)}
                onTouchEnd={(e) => touchEndToMouseUp(e)}
                >
                <Hue
                    width={props.width}
                    color={props.color}
                    onChange={props.onChange}
                    />
            </Box>
            <Box height={50}></Box>
            <Box
                id="dummyBox"
                ref={dummyRef}
                onTouchStart={(e) => console.log('touch start')}
                onTouchMove={(e) => console.log('touch move')}
                onTouchEnd={() => console.log('touch end')}
                onMouseDown={(e) => console.log('mouse down')}
                onMouseMove={(e) => console.log('mouse move')}
                onMouseUp={(e) => console.log('mouse up')}
                >
                test
            </Box>
        </Fragment>
    )
}