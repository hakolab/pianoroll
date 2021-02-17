import React from 'react'
import { Box } from '@material-ui/core'
import { Fragment } from 'react'


const keyHeight = 88

const Keys = () => {

    const keyArray = new Array(keyHeight).fill(null).map((_,i) =>i )
    console.log(keyArray)


    return (
        <Fragment>
            {keyArray.map(key => {
                return <Box>{key}</Box>
            })}
        </Fragment>
    )
}

export default Keys