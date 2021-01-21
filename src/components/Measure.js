import React from 'react'
import Measure from 'react-measure'

export default function Measure(){

    const [dimensions, setDimensions] = useState({width: 50, height: 50})
    
    return (
        <Measure bounds onResize={contentRect => {setDimensions(contentRect.bounds)}}>
            {({measureRef}) =>(
                <Box ref={measureRef} bgcolor="blue">{dimensions.width}:{dimensions.height}</Box>
            )}
        </Measure>
    )
}