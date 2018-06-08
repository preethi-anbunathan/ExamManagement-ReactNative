import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox, Icon} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage,ListItem}
    from 'react-native-elements'
import RadioForm from 'react-native-radio-form';

class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = { title: "Multiple Choice"}
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: 0,
            options: '',
            choices: [],
            correctOption: ''
        }

        this.updateForm = this.updateForm.bind(this);
        this.addChoice = this.addChoice.bind(this);
    }

    updateForm(newState) {
        this.setState(newState)
    }

    addChoice(newChoice) {
        this.setState({ choices: [ ...this.state.choices, {
                option: newChoice
            }]})
    }

    setCorrectOption (index, value) {
            this.setState({
                correctOption: value
            })
        console.log(this.state.correctOption)
    }

    deleteOption (index) {
        var array= this.state.choices
        array.splice(index, 1)
        this.setState ({choices: array})
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
                }/>
                <FormValidationMessage>
                    Description is required
                </FormValidationMessage>

                <FormLabel>Choices</FormLabel>
                <FormInput onChangeText={
                    text => this.updateForm({options: text})
                }/>
                <FormValidationMessage>
                    Choice is required
                </FormValidationMessage>
                <Button title="Add Choice"
                        onPress={() => this.addChoice
                        (this.state.options)}/>

                {this.state.choices.map(
                    (choice, index) => (
                        <ListItem
                            key={index}
                            title={choice.option}
                            leftIcon={<Icon
                                reverse
                                name='circle'
                                type='font-awesome'
                                size={2}
                                onPress={() => this.setCorrectOption(index, choice)}
                                style={{paddingRight:20}}
                            />}
                            rightIcon={ <Icon
                                reverse
                                name='trash'
                                type='font-awesome'
                                size={10}
                                onPress={() => this.deleteOption(index)}
                                style={{paddingRight:20}}
                            />}
                        />
                    ))}

                <FormValidationMessage>
                    Click on the left icon to chose the correct option
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
                <View>
                    {this.state.choices.map(
                        (choice, index) => (
                            <ListItem
                                key={index}
                                title={choice.option}
                                leftIcon={<Icon
                                    reverse
                                    name='circle'
                                    type='font-awesome'
                                    size={2}
                                   // onPress={() => this.setCorrectOption(index, choice)}
                                    style={{paddingRight:20}}
                                />}
                                // rightIcon={ <Icon
                                //     reverse
                                //     name='trash'
                                //     type='font-awesome'
                                //     size={5}
                                //     onPress={() => this.deleteOption(index)}
                                //     style={{paddingRight:20}}
                                // />}
                            />))}
                </View>
            </View>
        )
    }
}

export default MultipleChoiceQuestionEditor