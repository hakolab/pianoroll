import React from 'react'
import { Slider } from '@material-ui/core'
import { connect } from 'react-redux'
import { change } from './Store'
import CustomSlider from './CustomSlider'

class App extends React.Component {

    constructor(props){
        super(props)
    }

    handleChange = (event, newValue) => {
        this.props.dispatch(change(newValue))
    }

    render(){
        return(
            <div>
                <CustomSlider
                    onChange={(event, newValue) => this.handleChange(event, newValue)}
                    value={this.props.conf.width.value} />
            </div>
        )
    }
}

App = connect((state) => state)(App)
export default App