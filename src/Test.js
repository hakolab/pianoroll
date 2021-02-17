import React, { Fragment, useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import Grids from './Grids'

const config = {
    gridWidth: 4,
    tileHeight: 4,
}

const style = {
    width: "150px",
    height: "30px",
}

const styleClick = {
    width: "150px",
    height: "30px",
    backgroundColor: "blue",
}

const Test = () => {
    return (
        <Box>
            <Grids></Grids>
        </Box>
    )
}

export default Test
