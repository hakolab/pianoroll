import React, { Fragment, useState } from 'react'
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames'
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        color: "#4D4D4D",
        fontWeight: "bold",
        border: "1px solid #C0C0C0",
        margin: "2px",
        height: "20px",
    },
    active: {
        backgroundColor: "#ffffe0",
        '&:hover': {
            backgroundColor: "#fafad2"
        },
    },
    nonActive: {
        backgroundColor: 'tranceparent',
        '&:hover': {
            backgroundColor: '#FCFCFC',
        },
    }

}))

const Tile = (props) => {
    const { children, onClick, ...others } = props
    const classes = useStyles()

    const [isActive, setIsActive] = useState(false)

    function handleClick(){
        setIsActive(!isActive)
        props.set("true")
    }

    return (
        <Box className={classNames(classes.root, isActive ? classes.active : classes.nonActive)} onClick={handleClick}>{children}</Box>
    )
}

const Tiles = (props) => {
    return (
        <Fragment>
            <Tile set={props.set}></Tile>
        </Fragment>
    )
}
    export default Tiles