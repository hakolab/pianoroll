import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import classNames from 'classnames'

const useStyles = makeStyles({
    root: {
        backgroundColor: '#F5F5F5',
        width: "80px",
        height: "500px",
    },
    select: {
        backgroundColor:"#f0f8ff"
    }
})

const Grid = (props) => {
    const classes = useStyles()

    return (
        <Box className={classNames(classes.root, props.selection ? classes.select : "")}>
            {props.children}
        </Box>
    )
}

export default Grid