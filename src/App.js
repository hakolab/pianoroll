import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { Box, Button} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Stamp from './Stamp';

const ButtonLikeTab = withStyles({
    root: {
        width: "150px",
        borderRadius: "0",
    }
})(Button)

export default function App(){
    return (
        <Router>
            <Box display="flex" flexDirection="row">
                <Box flexGrow={1}>
                    <Link to="./">
                        <Brightness7Icon />
                    </Link>
                </Box>
                <Box>
                    <Link to="./" style={{textDecoration: "none"}}>
                        <ButtonLikeTab size="large">
                            Stamp
                        </ButtonLikeTab>
                    </Link>
                </Box>
                <Box>
                    <Link to="./gallery" style={{textDecoration: "none"}}>
                        <ButtonLikeTab size="large">
                            Gallery
                        </ButtonLikeTab>
                    </Link>
                </Box>
                <Box>
                    <Link to="./about" style={{textDecoration: "none"}}>
                        <ButtonLikeTab size="large">
                            About
                        </ButtonLikeTab>
                    </Link>
                </Box>
            </Box>

                <Route exact path="./">
                    <Stamp />
                </Route>
                <Route path="./gallery">
                    Stamps written by various people.
                </Route>
                <Route path="./about">
                    About Stamp
                </Route>

        </Router>
    )
}