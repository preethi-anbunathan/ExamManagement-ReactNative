import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox, Divider, Card} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'
import FillInTheBlanksService from '../services/FillInTheBlanksService'

class FillInTheBlanksEditor extends Component {
    static navigationOptions = { title: "Fill in the blanks"}
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            points: 0,
            variables: '',
            type: 'blanks',
            examId:'',
            lessonId:''
        };
        this.createBlanks = this.createBlanks.bind(this);
        this.setExamId = this.setExamId.bind(this);
        this.fillInTheBlanksService = FillInTheBlanksService.instance;
    }

    setExamId(examId) {
        this.setState({examId: examId});
    }

    componentDidMount() {
        const {navigation} = this.props;
        this.state.examId = navigation.getParam("examId")
        this.state.lessonId = navigation.getParam("lessonId")
    }
    componentWillReceiveProps(newProps){
        this.setExamId(newProps.examId);
    }

    createBlanks() {

        let newblank;
        newblank={
            title:this.state.title,
            desciption : this.state.description,
            variables : this.state.variables,
            points : this.state.points,
            type: this.state.type
        }


        this.fillInTheBlanksService.createBlanks(newblank,this.state.examId)
            .then(this.props.navigation.navigate("QuestionList",{lessonId:this.state.lessonId}));
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
            <ScrollView>
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

                <Button
                    onPress={this.createBlanks}
                    backgroundColor="green"
                           color="white"
                           title="Save"/>
                <Button
                    onPress={() =>this.props
                        .navigation
                        .goBack()}
                    backgroundColor="red"
                           color="white"
                           title="Cancel"/>
                <Text> </Text>
                <Text> </Text>
                <Divider
                    style={{
                        backgroundColor:
                            'black' }} />

                <Text h4>Preview</Text>


                <ScrollView style={{paddingVertical: 10}}>
                    <View style={{paddingHorizontal: 5}}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1}}>
                                    <Text h4>{this.state.title}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{textAlign: 'right'}}>{this.state.points} pts</Text>
                                </View>
                            </View>
                            <View style={{paddingVertical: 2}}>
                                <Text>{this.state.description}</Text>
                            </View>
                            <View style={{paddingVertical: 10}}>
                                <Text>{this.renderBlanks()}</Text>
                            </View>

                    </View>
                </ScrollView>

            </ScrollView>
        )
    }
}

export default FillInTheBlanksEditor