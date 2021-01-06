import React from 'react'
import { Slider } from '@material-ui/core'
import { connect } from 'react-redux'
import { change } from './Store'

class App extends React.Component {

    constructor(props){
        super(props)
    }

    handleChange = (event, newValue) => {
        this.props.dispatch(change(newValue))
    }

    render(){
        const value = this.props.value
        return(
            <div>
                <Slider 
                    step={1}
                    max={50}
                    onChange={(event, newValue) => this.handleChange(event, newValue)}
                    value={value}/>
            </div>
        )
    }
}

App = connect((state) => state)(App)
export default App