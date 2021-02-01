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

    useEffect(() => {
        const hueClick = (e) => {
            console.log('ontouchstart')
            let event = document.createEvent('MouseEvents')
            event.initEvent('click', false, true)
            dummyRef.current.dispatchEvent(event)
            
            //dummyRef.current.dispatchEvent(new MouseEvent('mousedown', {clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY}))
            //console.log(dummyRef.current)    
        }

        //touchableHueRef.current.addEventListener('touchstart', (e) => hueClick(e))

        //dummyRef.current.addEventListener('mousedown', (e) => handleClick(e))

/*         const hueClick = (e) => {
            console.log(e)
            //dummyRef.current.dispatchEvent(new MouseEvent('mousedown', {clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY}))
            e.target.dispatchEvent(new MouseEvent('mousedown', {clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY}))
            touchableHueRef.current.children[0].dispatchEvent(new MouseEvent('mouseup', {clientX: e.changedTouches[0].clientX, clientY: e.changedTouches[0].clientY}))
        }

        touchableHueRef.current.addEventListener('touchstart', (e) => hueClick(e),{passive: true})

        dummyRef.current.addEventListener('mousedown', (e) => handleClick(e))
         */
    },[])

    const touchStartToMouseDown = (e) => {
        e.clientX = e.changedTouches[0].clientX
        e.clientY = e.changedTouches[0].clientY
        touchableHueRef.current.children[0].dispatchEvent(new MouseEvent('mousedown', e))
    }

    const touchMoveToMouseMove = (e) => {
        e.clientX = e.changedTouches[0].clientX
        e.clientY = e.changedTouches[0].clientY
        touchableHueRef.current.children[0].dispatchEvent(new MouseEvent('mousemove', e))
    }

    const touchEndToMouseUp = () => {
        console.log('test')
        touchableHueRef.current.children[0].dispatchEvent(new MouseEvent('mousemove'))
    }

    return (
        <Fragment>
            <Box
                ref={touchableHueRef}
                onTouchStart={(e) => touchStartToMouseDown(e)}
                onTouchMove={(e) => touchMoveToMouseMove(e)}
                //onTouchEnd={() => touchEndToMouseUp}
                >
                <Hue
                    width={props.width}
                    color={props.color}
                    onChange={props.onChange}
                    />
            </Box>
            <Box height={50}></Box>
            <Box id="dummyBox" ref={dummyRef} onClick={handleClick}>test</Box>
        </Fragment>
    )
}