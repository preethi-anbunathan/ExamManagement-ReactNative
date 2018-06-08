import React from 'react'
import {View, TextInput,ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
    from 'react-native-elements'




class FillInTheBlanksEditor extends React.Component {
    static navigationOptions = { title: "Fill in the Blanks"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            variables: '',
            points: 0,
            instructions:'Fill in the blanks'
        }

        this.updateForm = this.updateForm.bind(this)
        // this.saveQuestion = this.saveQuestion.bind(this)

    }


    updateForm(newState) {
        this.setState(newState)
    }


    renderBlanks(){
        var str = this.state.variables
        var cur= str.replace(/\[(.+?)\]/g, "______")
        return cur
    }


    render() {
        return(
            <View>
                <FormLabel>Title</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({title: text})
                }/>
                <FormValidationMessage>
                    Title is required
                </FormValidationMessage>

                <FormLabel>Description</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({description: text})
                }
                />
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Variables</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({variables: text})
                }
                />
                <FormValidationMessage>
                    Variable is required
                </FormValidationMessage>

                <FormLabel>Points</FormLabel>
                <FormInput  onChangeText={
                    text => this.updateForm({points: text})
                }/>
                <FormValidationMessage>
                    Points is required
                </FormValidationMessage>

                <Button	backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button	backgroundColor="red"
                           color="white"
                           title="Cancel"/>

                <Text h3>Preview</Text>
                <Text h2>{this.state.title}</Text>
                <Text>{this.state.description}</Text>
                <Text>{this.renderBlanks()}</Text>

            </View>
        )
    }
}

export default FillInTheBlanksEditor