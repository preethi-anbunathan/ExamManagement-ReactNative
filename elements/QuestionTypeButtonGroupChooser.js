import React, {Component} from 'react'
import {ButtonGroup} from 'react-native-elements'




class QuestionTypeButtonGroupChooser extends React.Component{
    constructor () {
        super()
        this.state = { selectedIndex: 2 }
        this.updateIndex = this.updateIndex.bind(this)
    }
    updateIndex (selectedIndex) { this.setState({selectedIndex}) }
    render(){
        const questionTypes = ['Multiple \nChoice',
            'Fill in the \nblank', 'Essay', 'True or\nfalse']
        const { selectedIndex } = this.state
        return(
            <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={selectedIndex}
                buttons={questionTypes}
                containerStyle={{height: 75}}/>
        )
    }
}

export default QuestionTypeButtonGroupChooser