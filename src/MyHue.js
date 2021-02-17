import React from 'react'
import { Hue } from 'react-color-palette/lib/components/Hue'
import { useColor } from 'react-color-palette'
import { useTouchToMouse } from './useTouchToMouse'
import { Box } from '@material-ui/core'

export default function MyHue(){

    const [color, setColor] = useColor("hex", "#ff880")

    const ref = useTouchToMouse(true)

    return ( 
        <Box ref={ref}>
        <Hue
        width={456}
        color={color}
        onChange={setColor}
        />
        </Box>
    )
}