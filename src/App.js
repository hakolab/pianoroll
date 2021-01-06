import React from 'react'
import { Slider } from '@material-ui/core'

class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            value: 50
        }
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    render(){
        const value = this.state.value
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

export default App